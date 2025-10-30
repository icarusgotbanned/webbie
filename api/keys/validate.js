// api/validate.js
import crypto from "crypto";
import { findKeyByHash, hasActiveSub } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const authz = req.headers.authorization || "";
    const token = authz.replace(/^Bearer\s+/i, "").trim();
    if (!token.startsWith("ask_")) return res.status(401).json({ error: "Invalid token" });

    const hash = crypto.createHash("sha256").update(token).digest("hex");
    const key = await findKeyByHash(hash);
    if (!key) return res.status(401).json({ error: "Key not found or inactive" });

    const active = await hasActiveSub(key.user_id);
    if (!active) return res.status(402).json({ error: "Subscription inactive" });

    res.status(200).json({ ok: true, userId: key.user_id, keyId: key.id });
  } catch (e) {
    console.error("[validate] error:", e);
    res.status(500).json({ error: e.message });
  }
}
