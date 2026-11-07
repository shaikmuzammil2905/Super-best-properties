import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gidrbkijntosrjaapiua.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZHJia2lqbnRvc3JqYWFwaXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNTM2OTAsImV4cCI6MjEwOTYyOTY5MH0.wyYe946PVln7a5F7HLbWqPhhAt_hkwCrcpT963EcXew';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Check if Supabase connection is healthy and verify table existence
 */
export async function checkSupabaseStatus() {
  try {
    const { data, error } = await supabase.from('properties').select('id').limit(1);
    if (!error) {
      return { connected: true, tablesReady: true };
    }
    // If error indicates table doesn't exist yet (PGRST205)
    if (error.code === 'PGRST205' || error.message?.includes('not find the table')) {
      return { connected: true, tablesReady: false, error: 'Database tables pending initial setup' };
    }
    return { connected: false, tablesReady: false, error: error.message };
  } catch (err) {
    return { connected: false, tablesReady: false, error: err.message };
  }
}

