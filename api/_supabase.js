import { createClient } from "@supabase/supabase-js";

// Support both SUPABASE_SERVICE_ROLE_KEY and SUPABASE_SERVICE_ROLE for compatibility
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!process.env.SUPABASE_URL || !serviceRoleKey) {
  console.error("[_supabase] Missing required environment variables:");
  console.error("  SUPABASE_URL:", process.env.SUPABASE_URL ? "✓" : "✗");
  console.error("  SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE:", serviceRoleKey ? "✓" : "✗");
}

const supa = createClient(
  process.env.SUPABASE_URL || "",
  serviceRoleKey || "",
  { auth: { persistSession: false } }
);

export default supa;
