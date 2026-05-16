import { Resend } from "resend";

let connectionSettings: any;

async function getCredentialsFromConnector() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken || !hostname) return null;

  try {
    connectionSettings = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
      {
        headers: {
          Accept: "application/json",
          "X-Replit-Token": xReplitToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data.items?.[0]);

    if (connectionSettings?.settings?.api_key) {
      return {
        apiKey: connectionSettings.settings.api_key,
        fromEmail: connectionSettings.settings.from_email,
      };
    }
  } catch (_) {}

  return null;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
export async function getUncachableResendClient() {
  // Prefer the manually-set RESEND_API_KEY env var, fall back to the connector
  const manualKey = process.env.RESEND_API_KEY;

  if (manualKey) {
    return {
      client: new Resend(manualKey),
      // Resend's shared sender — works for sending to the account's registered email
      fromEmail: "onboarding@resend.dev",
    };
  }

  const connector = await getCredentialsFromConnector();
  if (connector) {
    return {
      client: new Resend(connector.apiKey),
      fromEmail: connector.fromEmail || "onboarding@resend.dev",
    };
  }

  throw new Error("Resend is not configured. Please set RESEND_API_KEY.");
}
