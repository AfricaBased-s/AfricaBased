const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Supabase configuration
const SUPABASE_URL = 'https://yoqtahdctzponqkmgkzn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcXRhaGRjdHpwb25xa21na3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0OTkzNjMsImV4cCI6MjA3MTA3NTM2M30.D7qHpHtZsPYx8vyjA6eT0ukpZacALXosVErl3bMgJUk';
const supabase = require('./supabaseClient');
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Static files (optional, serve frontend)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
