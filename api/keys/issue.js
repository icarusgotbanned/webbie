// api/keys/issue.js
import { hasActiveSub, newApiKey, storeKey, upsertUser } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { email, name = "default" } = JSON.parse(req.body || "{}");
    if (!email) return res.status(400).json({ error: "Missing email" });

    await upsertUser({ id: email, email });

    const active = await hasActiveSub(email);
    if (!active) return res.status(402).json({ error: "No active subscription" });

    const { raw, hash, lastFour } = newApiKey();
    await storeKey({ userId: email, name, hash, lastFour });

    return res.status(200).json({ apiKey: raw, lastFour }); // show once
  } catch (e) {
    console.error("[keys/issue] error:", e);
    return res.status(500).json({ error: e.message });
  }
}
