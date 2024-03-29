"use client";
import React from 'react';
//import { useRouter } from 'next/router';
import Map from '@/app/components/MapLoc';
import Navbar from '@/app/navbar/page';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className='cardmargin-2'>
        <Map />
      </div>
    </div>
  );
};

export default LoginPage;