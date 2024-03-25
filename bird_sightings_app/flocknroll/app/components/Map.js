import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, Polygon } from 'react-leaflet';
import { getStateBoundaries } from '../api/request';


function convertData(data) {
  const formattedData = {
    type: "Feature",
    id: data.GEOID,
    properties: {
      name: data.NAME,
      state_code: data.STUSPS,
      land_area: 268422891711,
      water_area: 1181621593
    },
    geometry: data.geometry,
  };
  return formattedData;
}

function MapStates() {
  // const [isLoading, setIsLoading] = useState(true);
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stateBoundaries = await getStateBoundaries();
        console.log("in map raw:", stateBoundaries)
        const formattedData = stateBoundaries.map(convertData);
        console.log("in map formatted:", formattedData)
        const data = {
          type: "FeatureCollection",
          features: formattedData
        }
        console.log("in map before setting:", data)
        // setStateData(data);
        setStateData(data);
        // setIsLoading(false);
        console.log("in map after setting:", stateData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
 

  return (
    <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '400px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GeoJSON data={statePolygons} /> */}
      { stateData.features.length > 0 && (
        stateData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          // const coordinates = state.geometry.coordinates
          return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#FD8D3C'
                });
              },
              click: (e) => {

              }
            }}
          />)
        }))
      } 
    </MapContainer>
  );
}

export default MapStates;
