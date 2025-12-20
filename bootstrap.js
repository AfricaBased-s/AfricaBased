// bootstrap.js
// Call this script (as a module) before importing any modules that expect Supabase to be initialized.
import { initSupabaseClient, isSupabaseInitialized } from './supabaseClient.js';

// Try to initialize using runtime-injected window.__ENV first
const env = (typeof window !== 'undefined' && window.__ENV) ? window.__ENV : null;
if (env && env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
  try {
    initSupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    console.info('Supabase initialized from window.__ENV');
  } catch (e) {
    console.warn('Failed to init Supabase from window.__ENV', e);
  }
} else {
  // If not provided, rely on supabaseClient.js auto-init behaviour or fallback values defined there.
  if (typeof isSupabaseInitialized === 'function' && isSupabaseInitialized()) {
    console.info('Supabase already initialized');
  } else {
    console.info('Supabase not initialized by env; relying on supabaseClient.js defaults or manual init.');
  }
}
