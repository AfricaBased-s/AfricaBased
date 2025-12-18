import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dcbxjekrwgblxpyfhyat.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYnhqZWtyd2dibHhweWZoeWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDk5MjYsImV4cCI6MjA4MTYyNTkyNn0.5Y-REVsT3EzVtiHN6Sjfy8rIts4HRzOK82tHGBu1yyg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return !!session
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return user
}
