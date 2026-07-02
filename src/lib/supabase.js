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
const SUPABASE_URL = "https://tcsfhsjvdwedulygnson.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc2Zoc2p2ZHdlZHVseWduc29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjk2NTAsImV4cCI6MjA3Nzc0NTY1MH0.9Td-A2V-pTJ71bLxSk_s1EXAMxVjt3WC1Qpq5qxWBTI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
