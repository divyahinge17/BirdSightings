"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const LocationPage = () => {
//   const [searchParams] = useSearchParams();
//   const state = searchParams.get('state');
  const router = useRouter();
  const { state } = router.query;

  const [map, setMap] = useState(null);

  // Function to initialize the Google Map
  const initMap = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: state }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const mapInstance = new google.maps.Map(document.getElementById('map'), {
          center: results[0].geometry.location,
          zoom: 8,
        });
        setMap(mapInstance);
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  useEffect(() => {
    // Load Google Maps JavaScript API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Map of {state}</h1>
      <div id="map" style={{ width: '400px', height: '300px' }}></div>
    </div>
  );
};

export default LocationPage;