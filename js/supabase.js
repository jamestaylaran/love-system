// ============================================================
// Supabase Client Setup
// ============================================================
// Replace the values below with your own Supabase project URL
// and public (anon) key after creating a project at https://supabase.com
// See README.md for full setup instructions.

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabase = null;

if (typeof window !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes('YOUR_SUPABASE_URL')) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else if (typeof window !== 'undefined') {
  console.warn('Supabase not configured. Add your URL & anon key in js/supabase.js');
}

export { supabase };
