import supa from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  let body = "";
  await new Promise((resolve) => {
    req.on("data", (c) => (body += c));
    req.on("end", resolve);
  });

  let parsed = {};
  try { parsed = JSON.parse(body || "{}"); } catch {}

  const { license_key } = parsed;
  if (!license_key) return res.status(400).send("missing license_key");

  const { data } = await supa
    .from("license_keys")
    .select("status")
    .eq("license_key", license_key)
    .maybeSingle();

  if (!data) return res.status(404).send("invalid");
  const active = data.status === "active" || data.status === "trialing";
  res.status(200).json({ active });
}
