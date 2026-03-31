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
   SINGLETONS
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
    const supabaseUrl = requireEnv("SUPABASE_URL");
    const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

    adminClient = createClient(supabaseUrl, serviceRoleKey, {
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
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient() must only be used in the browser.");
  }

  if (!browserClient) {
    const publicSupabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    const publicSupabaseAnonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

    browserClient = createClient(
      publicSupabaseUrl,
      publicSupabaseAnonKey,
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