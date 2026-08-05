require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://oggjdrpimglsdyezxjxx.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_jSs1a42EkchkCrQR4DnlXg_-ZaZCUad';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is connected to Supabase.' });
});

// Fetch all reports from Supabase
app.get('/api/reports', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    // Convert flat data back into expected structure
    const formattedData = data.map(item => ({
      id: item.id,
      type: item.type,
      severity: item.severity,
      location: { lat: item.lat, lng: item.lng },
      created_at: item.created_at
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit a new report to Supabase
app.post('/api/reports', async (req, res) => {
  try {
    const { type, severity, location } = req.body;
    
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ error: 'Location (lat, lng) is required' });
    }

    const { data, error } = await supabase
      .from('reports')
      .insert([
        { type, severity, lat: location.lat, lng: location.lng }
      ])
      .select();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return res.status(500).json({ error: 'Failed to save report' });
    }

    res.status(201).json({ message: 'Report submitted successfully', report: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
