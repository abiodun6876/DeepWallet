"use client"

import React from 'react';
import Wallet from './components/Wallet';
import MouseTracker from './components/MouseTracker';
import ShowTime from './components/ShowTime';

function Home() {
  return (
    <>
     {/*ShowTime*/}
    <ShowTime />
      {/* wallet*/}
      <Wallet />

      {/*MouseTracker */}
      <MouseTracker />
    </>
  );
}

export default Home;
