import { createClient as createClientSupabase } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY harus ada di .env"
  );
}

let client: ReturnType<typeof createClientSupabase> | null = null;

export function getSupabaseClient() {
  if (client === null) {
    client = createClientSupabase(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

