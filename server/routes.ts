import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import { sendEmail } from "./mailer";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(), // honeypot — must be empty
});

const RECIPIENT_EMAIL = "richward33@gmail.com";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);

      // Honeypot check — bots fill this in, humans don't see it
      if (validatedData.website) {
        // Silently succeed so bots don't know they were blocked
        return res.status(200).json({ success: true, message: "Message sent." });
      }

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

      await sendEmail({
        to: RECIPIENT_EMAIL,
        subject,
        html: htmlBody,
        replyTo: validatedData.email,
      });

      console.log(`[contact] Email sent to ${RECIPIENT_EMAIL} from ${validatedData.email}`);

      res.status(200).json({
        success: true,
        message: "Your message has been sent. We'll be in touch soon!",
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ success: false, error: validationError.message });
      }
      console.error("[contact] Error:", error.message);
      res.status(500).json({ success: false, error: "An error occurred. Please try again later." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
