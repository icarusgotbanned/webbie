// api/keys/revoke.js
import { revokeKey } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { id, email } = JSON.parse(req.body || "{}");
    if (!id || !email) return res.status(400).json({ error: "Missing id/email" });
    await revokeKey(id, email);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[keys/revoke] error:", e);
    res.status(500).json({ error: e.message });
  }
}
