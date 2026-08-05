require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly.' });
});

app.get('/api/reports', (req, res) => {
  // Mock data for hazard reports
  res.json([
    { id: 1, type: 'Oil Spill', location: { lat: 34.05, lng: -118.25 }, severity: 'High' },
    { id: 2, type: 'Algal Bloom', location: { lat: 36.77, lng: -119.41 }, severity: 'Medium' }
  ]);
});

app.post('/api/reports', (req, res) => {
  const newReport = req.body;
  // In a real app, save to database
  res.status(201).json({ message: 'Report submitted successfully', report: newReport });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
