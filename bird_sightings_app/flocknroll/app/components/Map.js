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
import { getStateBoundaries, getBirdsSightings } from "../api/request";
import Image from "next/image";

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
  const [stateData, setStateData] = useState([]);
  const [sightings, setSightings] = useState([]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    (async () => {
      setStateData([]);
      setSightings([]);

      if (typeof window !== 'undefined') {
        (async () => { // Wrap fetchData in an async IIFE
          try {
            const stateBoundaries = await getStateBoundaries();
            const formattedData = stateBoundaries.map(convertData);
            const data = {
              type: "FeatureCollection",
              features: formattedData
            };
            await sleep(2000)

            setStateData(data);

          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setIsLoading(false); // Set loading to false after successful fetch or error
          }
        })(); // Invoke the IIFE immediately
      }

      try {
        if (sightingBird) {
          const sightings = await getBirdsSightings(sightingBird.species_code);

          setSightings(sightings)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after successful fetch or error
      }

      
    })(); // Invoke the IIFE immediately
  }, [sightingBird]);

  return (
    <div className="birdinfomargin flex justify-center items-center h-screen" style={{ position: 'sticky' }}>
      {
        stateData.features && sightings ? (
          <MapContainer className='mapcontainer'
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ width: "98%", height: "70%", position: "absolute", left: "0" }}
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
                    <Popup>
                      <p>
                        How Many: {sighting.HOW_MANY} <br />
                        Year: {sighting.Year}
                      </p>
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </MapContainer>
        ) : (
          <div className="flex justify-center">
            <Image src="/gif/mapload.gif" alt="Loading..." className="loading-gif"
              width={200}
              height={200} />
          </div>
        )
      }

    </div>
  );
}

export default MapStates;
