// api/checkout.js
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    if (!priceId) return res.status(500).json({ error: "Missing NEXT_PUBLIC_STRIPE_PRICE_ID" });
    if (!process.env.APP_URL) return res.status(500).json({ error: "Missing APP_URL" });

    // Create a checkout session without pre-attaching a customer.
    // Stripe will collect the buyer's email and create/attach a Customer automatically.
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.APP_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/cancel.html`,
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("[checkout] error:", e);
    const msg = e?.raw?.message || e.message || "Checkout error";
    return res.status(500).json({ error: msg });
  }
}
