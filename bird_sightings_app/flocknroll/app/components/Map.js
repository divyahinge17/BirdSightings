import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Polygon,
} from "react-leaflet";
import { getStateBoundaries, getBirdsSigntings } from "../api/request";

function convertData(data) {
  const formattedData = {
    type: "Feature",
    id: data.STUSPS,
    properties: {
      name: data.NAME,
      state_code: data.STUSPS,
    },
    geometry: data.geometry,
  };
  return formattedData;
}

function MapStates({ sightingBird }) {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  console.log('In Map...')
  console.log(sightingBird)

  useEffect(() => {
    (async () => {
      try {
        console.log('In Sighting Effect')
        console.log(sightingBird)
        if (sightingBird) {
          const sightings = await getBirdsSigntings(sightingBird.species_code);
          console.log(sightings)
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
                      How Many: {sighting.HOW_MANY} <br />
                      Year: {sighting.Year}
                    </p>
                  </Popup>
                </Marker>
              );
            }
            return null;
          });
          setMarkers(newMarkers.filter(Boolean));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after successful fetch or error
      }
    })(); // Invoke the IIFE immediately
  }, [sightingBird]);

  return (
    <div className="birdinfomargin flex justify-center items-center h-screen">
    <MapContainer className='mapcontainer'
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ margin:"25px", width: "50%", height: "70%", position: "absolute", left: "0" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isLoading ? (
        <div className="text-center p-4">Loading sightings...</div>
      ) : markers.length > 0 ? (
        markers
      ) : (
        <div className="text-center p-4">No sightings found for this bird.</div>
      )}
    </MapContainer>
    </div>
  );
}

export default MapStates;
