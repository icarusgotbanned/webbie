// api/checkout.js
import Stripe from "stripe";
import { upsertUser } from "./_db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { email } = JSON.parse(req.body || "{}");
    if (!email) return res.status(400).json({ error: "Missing email" });

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    if (!priceId) return res.status(500).json({ error: "Missing NEXT_PUBLIC_STRIPE_PRICE_ID" });
    if (!process.env.APP_URL) return res.status(500).json({ error: "Missing APP_URL" });

    // Ensure Stripe customer
    const list = await stripe.customers.list({ email, limit: 1 });
    const customer = list.data[0] || await stripe.customers.create({ email, metadata: { userId: email } });

    // Ensure local user row
    await upsertUser({ id: email, email });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.APP_URL}/success.html`,
      cancel_url: `${process.env.APP_URL}/cancel.html`,
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("[checkout] error:", e);
    const msg = e?.raw?.message || e.message || "Checkout error";
    return res.status(500).json({ error: msg });
  }
}
