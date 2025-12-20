// supabaseClient.js (ESM - browser-ready)
// Loads the supabase-js ESM build from jsdelivr and exposes helpers.
// NOTE: anon keys are safe to include on public clients. Do NOT put service_role keys here.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.34.0/dist/supabase.min.js';

const supabaseUrl = 'https://dcbxjekrwgblxpyfhyat.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYnhqZWtyd2dibHhweWZoeWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDk5MjYsImV4cCI6MjA4MTYyNTkyNn0.5Y-REVsT3EzVtiHN6Sjfy8rIts4HRzOK82tHGBu1yyg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Also expose to window so non-module scripts can access it
window.supabase = supabase;

/*
 Helper wrappers
 - isAuthenticated(): returns true if there's an active session
 - getCurrentUser(): returns the user object or null
 - signUp(email, password): returns { data, error }
 - signIn(email, password): returns { data, error }
 - signOut(): returns { error }
*/

export const isAuthenticated = async () => {
  const { data: sessionData, error } = await supabase.auth.getSession();
  if (error) {
    console.warn('getSession error', error);
    return false;
  }
  return !!(sessionData && sessionData.session);
};

export const getCurrentUser = async () => {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.warn('getUser error', error);
    return null;
  }
  return userData ? userData.user : null;
};

export const signUp = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Optional: listen for auth state changes and re-expose on window
supabase.auth.onAuthStateChange((event, session) => {
  // simple global hook — you can replace with event dispatching
  window.__SUPABASE_AUTH_EVENT = { event, session };
  console.info('Auth event', event);
});
