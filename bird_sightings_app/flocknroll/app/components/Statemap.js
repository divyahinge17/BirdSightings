import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, Polygon, Marker, Popup } from 'react-leaflet';
import { getStateCoord } from '../api/request';
import { useSearchParams } from 'next/navigation';
import { getSightings } from '../api/request';
import L from "leaflet";

function StateMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [stateData, setStateData] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [center, setCenter] = useState([]); // Initial center value

  const searchParams = useSearchParams();
  const stateId = searchParams.get('stateId');
  const speciesCode = searchParams.get('speciesCode');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        try {
          const stateBoundaries = await getStateCoord(stateId);
          const formattedData = [{
            type: "Feature",
            id: stateBoundaries.STUSPS,
            properties: {
              name: stateBoundaries.NAME,
              state_code: stateBoundaries.STUSPS,
              center: stateBoundaries.center
            },
            geometry: stateBoundaries.geometry,
          }];

          const centerArray = stateBoundaries.center.slice(1, -1).split(',');
          const latitude = parseFloat(centerArray[0].trim());
          const longitude = parseFloat(centerArray[1].trim());
          setCenter([latitude, longitude]);

          const data = {
            type: "FeatureCollection",
            features: formattedData
          };
          setStateData(data);

          const sightingsData = await getSightings(stateId, speciesCode);
          setSightings(sightingsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  return (
    <>
      {center.length != 0 && ( // Render only if center is available
        <MapContainer
          center={center}
          zoom={6}
          style={{ width: '100%', height: '100%', position: 'sticky'}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {isLoading ? (
            <div>Loading data...</div>
          ) : (
            <>
              {stateData.features.length > 0 && (
                stateData.features.map((state, index) => {
                  let coordinates;
                  if (state.geometry.type === 'MultiPolygon') {
                    coordinates = state.geometry.coordinates.map(polygon => polygon[0]);
                  } else {
                    coordinates = state.geometry.coordinates[0];
                  }
                  coordinates = coordinates.map((item) => [item[1], item[0]]);
                  return (
                    <div key={state.id}>
                      {state.geometry.type === 'MultiPolygon' && state.geometry.coordinates.map((polygon, i) => (
                        <Polygon
                          key={`${state.id}-${i}`}
                          pathOptions={{
                            fillColor: '#FD8D3C',
                            fillOpacity: 0.7,
                            weight: 2,
                            opacity: 1,
                            dashArray: 3,
                            color: 'white'
                          }}
                          positions={polygon[0].map((item) => [item[1], item[0]])}
                        />
                      ))}
                      {state.geometry.type !== 'MultiPolygon' && (
                        <Polygon
                          key={state.id || index}
                          pathOptions={{
                            fillColor: '#FD8D3C',
                            fillOpacity: 0.7,
                            weight: 2,
                            opacity: 1,
                            dashArray: 3,
                            color: 'white'
                          }}
                          positions={coordinates}
                        />
                      )}
                    </div>
                  )
                })
              )}

              {/* Plotting markers */}
              {sightings.map((sighting, index) => (
                <Marker
                  key={index}
                  position={[sighting.location.coordinates[1], sighting.location.coordinates[0]]}
                  eventHandlers={{
                    mouseover: (e) => {
                      const layer = e.target;
                      layer.bindTooltip(`Year: ${sighting.Year}`).openTooltip();
                    }
                  }}

                  icon={
                    new L.Icon({
                      iconUrl: `/images/${sighting.Year}.png`,
                      iconSize: [45, 45],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      tooltipAnchor: [16, -28],
                      shadowSize: [41, 41]
                    })
                  }
                >
                </Marker>
              ))}
            </>
          )}
        </MapContainer>
      )}
    </>
  );
}

export default StateMap;
