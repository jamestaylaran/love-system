// ============================================================
// Supabase Client Setup (classic script — NO import/export)
// ============================================================
// Replace the two values below with your own Supabase project URL
// and public (anon / publishable) key after creating a project
// at https://supabase.com. See README.md for full setup instructions.
//
// Until then, the app runs in offline mode: everything saves to
// this browser's local storage and auto-syncs once configured.

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Shared with app.js as a global binding (classic scripts share scope).
let supabase = null;

const isConfigured =
  SUPABASE_URL &&
  !SUPABASE_URL.includes('YOUR_SUPABASE_URL') &&
  typeof window.supabase !== 'undefined' &&
  typeof window.supabase.createClient === 'function';

if (isConfigured) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.info('[Us 💖] Supabase connected — cloud sync active.');
} else {
  console.info('[Us 💖] Supabase not configured yet — using local storage. Add your keys in js/supabase.js');
}
