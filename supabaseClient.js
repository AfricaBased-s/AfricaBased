const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://yoqtahdctzponqkmgkzn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcXRhaGRjdHpwb25xa21na3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTkzNjMsImV4cCI6MjA3MTA3NTM2M30.D7qHpHtZsPYx8vyjA6eT0ukpZacALXosVErl3bMgJUk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;
