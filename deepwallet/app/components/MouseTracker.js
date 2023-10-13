'use client'
import React, { useState, useEffect } from 'react';

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      // Add event listener for mousemove
      window.addEventListener('mousemove', handleMouseMove);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const calculateBackgroundColor = () => {
    if (typeof window !== 'undefined') {
      // Calculate background color based on mouse position
      const red = Math.floor((position.x / window.innerWidth) * 255);
      const green = Math.floor((position.y / window.innerHeight) * 255);
      return `rgb(${red}, ${green}, 100)`;
    }
    return ''; // Provide a default value if window is not defined
  };

  return (
    <div
      className="container mx-auto text-center mt-5"
      style={{ backgroundColor: calculateBackgroundColor() }}
    >
      <h1 className="text-2xl text-gray-800">Mouse Tracker</h1>
      <p className="text-lg text-gray-600">Mouse coordinates:</p>
      <p className="text-lg text-gray-600">X: {position.x}</p>
      <p className="text-lg text-gray-600">Y: {position.y}</p>
    </div>
  );
};

export default MouseTracker;
