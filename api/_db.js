// api/_db.js (Supabase)
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE, // server-only
  { auth: { persistSession: false } }
);

export function hashKey(plaintext) {
  return crypto.createHash("sha256").update(plaintext).digest("hex");
}

export function newApiKey() {
  const raw = "ask_" + crypto.randomBytes(24).toString("base64url");
  return { raw, hash: hashKey(raw), lastFour: raw.slice(-4) };
}

export async function upsertUser({ id, email }) {
  // id = your user identifier (we’re using email unless you wire real auth)
  const { error } = await supabase
    .from("users")
    .upsert({ id, email }, { onConflict: "id" });
  if (error) throw error;
}

export async function upsertSubscription({ userId, stripeSubId, status, currentPeriodEnd }) {
  const payload = {
    id: stripeSubId,
    user_id: userId,
    stripe_sub_id: stripeSubId,
    status,
    current_period_end: currentPeriodEnd,
    updated_at: new Date().toISOString()
  };
  const { error } = await supabase
    .from("subscriptions")
    .upsert(payload, { onConflict: "id" });
  if (error) throw error;
}

export async function hasActiveSub(userId) {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .in("status", ["active","trialing"])
    .limit(1);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function storeKey({ userId, name, hash, lastFour }) {
  const { data, error } = await supabase
    .from("api_keys")
    .insert({ user_id: userId, name, hash, last_four: lastFour, active: true })
    .select("id")
    .single();
  if (error) throw error;
  return { id: data.id };
}

export async function revokeKey(id, userId) {
  const { error } = await supabase
    .from("api_keys")
    .update({ active: false, revoked_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function findKeyByHash(hash) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("hash", hash)
    .eq("active", true)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

export { supabase };
