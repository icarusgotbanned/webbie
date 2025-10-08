const stripe = require("./_stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.PUBLIC_SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_SITE_URL}/cancel.html`,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true }
  });

  res.writeHead(303, { Location: session.url }).end();
};
