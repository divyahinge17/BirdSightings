"use client";
import React from 'react';
//import { useRouter } from 'next/router';
import Map from '@/app/components/map1';

const HomePage = () => {
    //const router = useRouter();
  
    return (
      <div>
        <h1>US Interactive Map</h1>
        <Map/>
      </div>
    );
  };
  
  export default HomePage;