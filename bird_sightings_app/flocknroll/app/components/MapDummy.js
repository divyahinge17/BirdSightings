import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ sightings }) => {
  const [markers, setMarkers] = useState([]); // List to store markers

  useEffect(() => {
    const newMarkers = sightings.map((sighting) => {
      const { location } = sighting;
      if (
        location &&
        location.type === "Point" &&
        location.coordinates.length === 2
      ) {
        const [lng, lat] = location.coordinates;
        return (
          <Marker key={sighting._id} position={[lat, lng]}>
            <Popup>
              <p>
                Species Code: {sighting.SPECIES_CODE} <br />
                How Many: {sighting.HOW_MANY}
              </p>
            </Popup>
          </Marker>
        );
      }
      return null;
    });
    setMarkers(newMarkers.filter(Boolean)); // Filter out null markers
  }, [sightings]);

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.length > 0 && markers}
    </MapContainer>
  );
};

export default MapComponent;
