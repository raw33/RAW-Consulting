import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { createChallenge, verifySolution } from "altcha-lib";

const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "default-insecure-key-change-in-production";

export async function registerRoutes(app: Express): Promise<Server> {
  // ALTCHA challenge generation endpoint
  app.get("/api/altcha/challenge", async (req, res) => {
    try {
      const challenge = await createChallenge({
        hmacKey: ALTCHA_HMAC_KEY,
        maxNumber: 100000, // Adjust difficulty (higher = harder)
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
      // Verify ALTCHA solution
      const { altcha, ...formData } = req.body;
      
      if (!altcha) {
        return res.status(400).json({ 
          success: false, 
          error: "CAPTCHA verification required" 
        });
      }

      const isValid = await verifySolution(altcha, ALTCHA_HMAC_KEY);
      
      if (!isValid) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid CAPTCHA solution. Please try again." 
        });
      }

      // Validate form data
      const validatedData = insertContactSubmissionSchema.parse(formData);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Your message has been received. We'll be in touch soon!",
        id: submission.id 
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({ 
          success: false, 
          error: "An error occurred. Please try again later." 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
