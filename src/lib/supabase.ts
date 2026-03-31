import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireServerEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

let adminClient: SupabaseClient | null = null;
let browserClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseAdmin() must not be used in the browser.");
  }

  if (!adminClient) {
    const supabaseUrl = requireServerEnv("SUPABASE_URL");
    const serviceRoleKey = requireServerEnv("SUPABASE_SERVICE_ROLE_KEY");

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

export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient() must only be used in the browser.");
  }

  if (!browserClient) {
    const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!publicSupabaseUrl) {
      throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!publicSupabaseAnonKey) {
      throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }

    browserClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey, {
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
    });
  }

  return browserClient;
}