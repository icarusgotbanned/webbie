// api/stripe-webhook.js
import Stripe from "stripe";
import { buffer } from "micro"; // Vercel supports this
import { upsertSubscription } from "./_db.js"; // your Supabase helper (server-only)

export const config = { api: { bodyParser: false } }; // raw body required

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    // health check so hitting the URL in a browser doesn't 404
    return res.status(200).json({ ok: true, route: "/api/stripe-webhook" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whsec) return res.status(500).json({ error: "Missing STRIPE_WEBHOOK_SECRET" });

  let event;
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, whsec);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const subId = session.subscription;
        const customerId = session.customer;
        const sub = await stripe.subscriptions.retrieve(subId);
        const customer = await stripe.customers.retrieve(customerId);
        const email = customer.email || customer?.metadata?.userId;
        if (email) {
          await upsertSubscription({
            userId: email,
            stripeSubId: sub.id,
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          });
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const customer = await stripe.customers.retrieve(sub.customer);
        const email = customer.email || customer?.metadata?.userId;
        if (email) {
          await upsertSubscription({
            userId: email,
            stripeSubId: sub.id,
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          });
        }
        break;
      }
    }
    return res.status(200).json({ received: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
