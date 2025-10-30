// api/stripe-webhook.js
import Stripe from "stripe";
import { buffer as microBuffer } from "micro";
import { upsertSubscription, upsertUser } from "./_db.js";
import { makeLicense } from "./_license.js";
import supa from "./_supabase.js";
import { sendEmail } from "./_email.js";

export const config = { api: { bodyParser: false } };
export const runtime = "nodejs";

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
            // Ensure user row and record subscription
            try { await upsertUser({ id: email, email }); } catch {}
            await upsertSubscription({
              userId: email,
              stripeSubId: sub.id,
              status: sub.status,
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            });

            // Generate license, store, and email it
            const license = makeLicense();
            try {
              await supa.from("license_keys").insert({
                license_key: license,
                customer_id: customerId,
                subscription_id: subId,
                checkout_session_id: session.id,
                status: "active",
              });
            } catch (e) {
              console.error("[WH] license insert error:", e);
            }

            try {
              await sendEmail({
                to: email,
                subject: "Your Absolute Assistant license key",
                html: `
                  <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
                    <p>Thanks for subscribing! Here is your license key:</p>
                    <p style="font-family:ui-monospace,Consolas,Menlo,monospace;font-size:16px"><b>${license}</b></p>
                    <p>You can also retrieve it any time from the success page after checkout.</p>
                  </div>
                `,
              });
            } catch (e) {
              console.error("[WH] email send error:", e?.message || e);
            }
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
