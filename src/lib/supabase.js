import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration.
 *
 * Replace the values below with your actual Supabase project URL and
 * anon/public key — or, better yet, store them as Vite env variables:
 *
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 *
 * Create a `.env.local` file in the project root with the above values.
 * Never commit your real keys to version control.
 */
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || 'https://your-project.supabase.co';
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
