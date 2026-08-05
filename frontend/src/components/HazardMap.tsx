import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon missing issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface HazardReport {
  id?: number;
  type: string;
  location: { lat: number; lng: number };
  severity: string;
}

interface HazardMapProps {
  reports: HazardReport[];
}

const HazardMap: React.FC<HazardMapProps> = ({ reports }) => {
  return (
    <div className="glass-panel" style={{ padding: 0 }}>
      <div className="map-container">
        <MapContainer center={[35.0, -118.0]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {reports.map((report, index) => (
            <Marker key={index} position={[report.location.lat, report.location.lng]}>
              <Popup>
                <strong>{report.type}</strong><br />
                Severity: {report.severity}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HazardMap;
