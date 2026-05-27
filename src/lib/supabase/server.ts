import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Strip stray non-ASCII characters (BOM/zero-width/NBSP/smart punctuation) that
// can sneak into copy-pasted env values and break fetch headers.
const clean = (v: string | undefined) => (v ?? "").replace(/[^\x20-\x7E]/g, "").trim();

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore when middleware
            // is refreshing sessions.
          }
        },
      },
    }
  );
}
