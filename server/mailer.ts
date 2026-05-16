import nodemailer from "nodemailer";

export function createGmailTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD environment variables are required.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}
