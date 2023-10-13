"use client"

import React from 'react';
import Wallet from './components/Wallet';
import MouseTracker from './components/MouseTracker';
import ShowTime from './components/ShowTime';
import TextAnalysis from './components/TextAnalysis';
import ArrayPairFinder from './components/ArrayPairFinder';

function Home() {
  return (
    <>
     {/*ShowTime*/}
    <ShowTime />
      {/* wallet*/}
      <Wallet />

      {/*MouseTracker */}
      <MouseTracker />

{/*TextAnalysis */}
<TextAnalysis/>


{/* Use the ArrayPairFinder component */}
<ArrayPairFinder />
 
      
    </>
  );
}

export default Home;
