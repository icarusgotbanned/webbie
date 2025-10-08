const supa = require("./_supabase");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const { session_id } = req.query || {};
  if (!session_id) return res.status(400).send("missing session_id");

  const { data, error } = await supa
    .from("license_keys")
    .select("license_key")
    .eq("checkout_session_id", session_id)
    .maybeSingle();

  if (error) return res.status(400).send(error.message);
  res.status(200).json({ license_key: data?.license_key || null });
};
