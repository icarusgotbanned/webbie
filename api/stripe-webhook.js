// api/stripe-webhook.js
import Stripe from "stripe";
import { buffer as microBuffer } from "micro"; // requires "micro" in dependencies

export const config = { api: { bodyParser: false } };
export const runtime = "nodejs"; // be explicit

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Health check so opening in browser doesn't 404/500
    return res.status(200).json({ ok: true, route: "/api/stripe-webhook" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("[WH] Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Server misconfigured: STRIPE_SECRET_KEY" });
  }
  if (!whsec) {
    console.error("[WH] Missing STRIPE_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Server misconfigured: STRIPE_WEBHOOK_SECRET" });
  }

  let event;
  try {
    const buf = await microBuffer(req); // raw body
    event = stripe.webhooks.constructEvent(buf, sig, whsec);
  } catch (err) {
    console.error("[WH] Signature verification failed:", err?.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("[WH] Event:", event.type, "livemode:", event.livemode);

    // TODO: add your Supabase updates here after you see 200s in logs
    // e.g., on checkout.session.completed, fetch sub + customer, map to email/user, upsert subscription.

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("[WH] Handler error:", e);
    // While debugging, you can swallow errors to avoid Stripe retries:
    return res.status(200).json({ received: true, note: "temporary: swallowed error" });
  }
}
