import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import { getUncachableResendClient } from "./resend";
import { createChallenge, verifySolution } from "altcha-lib";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  altcha: z.string().min(1, "CAPTCHA verification required"),
});

const RECIPIENT_EMAIL = "richward33@gmail.com";
const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "default-insecure-key-change-in-production";

export async function registerRoutes(app: Express): Promise<Server> {
  // ALTCHA challenge generation endpoint
  app.get("/api/altcha/challenge", async (req, res) => {
    try {
      const challenge = await createChallenge({
        hmacKey: ALTCHA_HMAC_KEY,
        maxNumber: 100000,
        algorithm: "SHA-256",
        saltLength: 12,
      });
      res.json(challenge);
    } catch (error: any) {
      console.error("Error creating ALTCHA challenge:", error);
      res.status(500).json({ error: "Failed to create challenge" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { altcha, ...formFields } = req.body;

      // Verify CAPTCHA first
      if (!altcha) {
        return res.status(400).json({ success: false, error: "CAPTCHA verification required" });
      }
      const captchaValid = await verifySolution(altcha, ALTCHA_HMAC_KEY);
      if (!captchaValid) {
        return res.status(400).json({ success: false, error: "Invalid CAPTCHA. Please try again." });
      }

      const validatedData = contactSchema.omit({ altcha: true }).parse(formFields);

      const now = new Date();
      const dateTimeStr = now.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const subject = `Raw Con Replit Website Inquiry - ${dateTimeStr}`;

      const htmlBody = `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
        ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `;

      const { client, fromEmail } = await getUncachableResendClient();
      const sender = fromEmail || "onboarding@resend.dev";

      console.log(`[contact] Sending email from=${sender} to=${RECIPIENT_EMAIL} subject="${subject}"`);

      const { data, error } = await client.emails.send({
        from: sender,
        to: RECIPIENT_EMAIL,
        subject,
        html: htmlBody,
        replyTo: validatedData.email,
      });

      if (error) {
        console.error("[contact] Resend error:", JSON.stringify(error));
        return res.status(500).json({
          success: false,
          error: "Failed to send email. Please try again or message us on LinkedIn.",
        });
      }

      console.log("[contact] Email sent successfully, id:", data?.id);

      res.status(200).json({
        success: true,
        message: "Your message has been sent. We'll be in touch soon!",
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ success: false, error: validationError.message });
      }
      console.error("[contact] Unexpected error:", error);
      res.status(500).json({ success: false, error: "An error occurred. Please try again later." });
    }
  });

  // Temporary email test endpoint - remove after confirming delivery
  app.get("/api/test-email", async (req, res) => {
    try {
      const { client, fromEmail } = await getUncachableResendClient();
      const sender = fromEmail || "onboarding@resend.dev";
      console.log(`[test-email] fromEmail from connection: "${fromEmail}", using sender: "${sender}"`);
      const { data, error } = await client.emails.send({
        from: sender,
        to: RECIPIENT_EMAIL,
        subject: "RAW Consulting - Email Test",
        html: "<p>This is a test email to confirm Resend is configured correctly.</p>",
      });
      if (error) {
        console.error("[test-email] Resend error:", JSON.stringify(error));
        return res.status(500).json({ success: false, error, sender });
      }
      console.log("[test-email] Success:", data);
      res.json({ success: true, data, sender });
    } catch (err: any) {
      console.error("[test-email] Exception:", err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
