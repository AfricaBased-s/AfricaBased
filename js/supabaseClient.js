import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yoqtahdctzponqkmgkzn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcXRhaGRjdHpwb25xa21na3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTkzNjMsImV4cCI6MjA3MTA3NTM2M30.D7qHpHtZsPYx8vyjA6eT0ukpZacALXosVErl3bMgJUk'

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
