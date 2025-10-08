const stripe = require("./_stripe");
const getRawBody = require("raw-body");
const supa = require("./_supabase");
const { makeLicense } = require("./_license");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const raw = await getRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).send(`Webhook error: ${e.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        const license = makeLicense();
        await supa.from("license_keys").insert({
          license_key: license,
          customer_id: s.customer,
          subscription_id: s.subscription,
          checkout_session_id: s.id,
          status: "active"
        });
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        await supa.from("license_keys")
          .update({ status: sub.status })
          .eq("subscription_id", sub.id);
        break;
      }
    }
    res.status(200).send("ok");
  } catch (e) {
    res.status(400).send(e.message);
  }
};
