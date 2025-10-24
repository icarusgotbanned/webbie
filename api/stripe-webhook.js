// api/stripe-webhook.js
import Stripe from "stripe";
import { buffer as microBuffer } from "micro";
import { upsertSubscription, upsertUser } from "./_db.js";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, route: "/api/stripe-webhook" });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    console.error("[WH] Missing Stripe envs");
    return res.status(500).json({ error: "Webhook misconfigured" });
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const buf = await microBuffer(req); // raw body required
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[WH] Signature verification failed:", err?.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("[WH] Event:", event.type, "livemode:", event.livemode);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const subId = session.subscription;
        const customerId = session.customer;

        if (subId && customerId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          const customer = await stripe.customers.retrieve(customerId);
          const email = customer.email || customer?.metadata?.userId;
          if (email) {
            // Ensure we have a local user record for this email
            try { await upsertUser({ id: email, email }); } catch {}
            await upsertSubscription({
              userId: email,
              stripeSubId: sub.id,
              status: sub.status,
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            });
          }
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
          // Ensure user exists locally
          try { await upsertUser({ id: email, email }); } catch {}
          await upsertSubscription({
            userId: email,
            stripeSubId: sub.id,
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          });
        }
        break;
      }

      default:
        // ignore other events
        break;
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("[WH] Handler error:", e);
    // Return 200 while you debug to avoid Stripe retries
    return res.status(200).json({ received: true, note: "temporary: swallowed error" });
  }
}
