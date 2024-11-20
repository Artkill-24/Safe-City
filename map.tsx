import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ reports }) => {
  const defaultCenter = [45.4642, 9.1900]; // Milano center

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className="h-96 w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {reports.map((report) => (
        <Marker key={report.id} position={report.location}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{report.reportType}</h3>
              <p>{report.description}</p>
              <p className="text-sm text-gray-500">Status: {report.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
