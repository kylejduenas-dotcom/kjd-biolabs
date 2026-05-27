import { createBrowserClient } from "@supabase/ssr";

// Copy-pasted env values can carry invisible characters (BOM, zero-width space,
// non-breaking space, smart punctuation). Those are invalid in HTTP headers and
// make fetch throw "String contains non ISO-8859-1 code point", which breaks
// login. Strip anything outside printable ASCII before use.
const clean = (v: string | undefined) => (v ?? "").replace(/[^\x20-\x7E]/g, "").trim();

export function createClient() {
  return createBrowserClient(
    clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}
