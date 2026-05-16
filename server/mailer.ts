import { ReplitConnectors } from "@replit/connectors-sdk";

// Sends an email via Gmail using the Replit Gmail connector (OAuth — no API key needed).
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const connectors = new ReplitConnectors();

  // Gmail API requires the message to be base64url-encoded RFC 2822 format
  const lines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    html,
  ]
    .filter((l) => l !== undefined)
    .join("\r\n");

  const encoded = Buffer.from(lines)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await connectors.proxy(
    "google-mail",
    "/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw: encoded }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Gmail API error: ${JSON.stringify(result)}`);
  }

  return result;
}
