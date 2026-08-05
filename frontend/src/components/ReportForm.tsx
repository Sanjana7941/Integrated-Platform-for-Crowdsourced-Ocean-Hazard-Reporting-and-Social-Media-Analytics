import React, { useState } from 'react';
import { submitReport } from '../api';

const ReportForm: React.FC<{ onReportAdded: () => void }> = ({ onReportAdded }) => {
  const [type, setType] = useState('Oil Spill');
  const [severity, setSeverity] = useState('High');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitReport({
        type,
        severity,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      });
      alert('Report submitted successfully!');
      setLat('');
      setLng('');
      onReportAdded();
    } catch (error) {
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel">
      <h3>Submit Hazard Report</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Hazard Type</label>
          <select className="form-control" value={type} onChange={e => setType(e.target.value)}>
            <option>Oil Spill</option>
            <option>Algal Bloom</option>
            <option>Plastic Pollution</option>
            <option>Coral Bleaching</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Severity</label>
          <select className="form-control" value={severity} onChange={e => setSeverity(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input 
            type="number" 
            step="any"
            className="form-control" 
            value={lat} 
            onChange={e => setLat(e.target.value)} 
            required 
            placeholder="e.g. 34.05"
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input 
            type="number" 
            step="any"
            className="form-control" 
            value={lng} 
            onChange={e => setLng(e.target.value)} 
            required 
            placeholder="e.g. -118.25"
          />
        </div>

        <button type="submit" className="btn" style={{ width: '100%', marginTop: '8px' }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
