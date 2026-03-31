import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* -----------------------------
   ENV HELPERS
----------------------------- */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/* -----------------------------
   ENV VALUES (STRICT)
----------------------------- */

const SUPABASE_URL = requireEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

const PUBLIC_SUPABASE_URL = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const PUBLIC_SUPABASE_ANON_KEY = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

/* -----------------------------
   SINGLETONS (IMPORTANT)
----------------------------- */

let adminClient: SupabaseClient | null = null;
let browserClient: SupabaseClient | null = null;

/* -----------------------------
   SERVER (ADMIN) CLIENT
----------------------------- */

export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must not be used in the browser.");
  }

  if (!adminClient) {
    adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          "x-application-name": "orbitlink-admin",
        },
      },
    });
  }

  return adminClient;
}

/* -----------------------------
   BROWSER CLIENT (SAFE)
----------------------------- */

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
        global: {
          headers: {
            "x-application-name": "orbitlink-client",
          },
        },
      }
    );
  }

  return browserClient;
}