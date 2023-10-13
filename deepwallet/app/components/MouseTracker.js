import React, { useState } from 'react';

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const calculateBackgroundColor = () => {
    // Calculate background color based on mouse position
    const red = Math.floor((position.x / window.innerWidth) * 255);
    const green = Math.floor((position.y / window.innerHeight) * 255);
    return `rgb(${red}, ${green}, 100)`;
  };

  return (
    <div
      className="container mx-auto text-center mt-5"
      onMouseMove={handleMouseMove}
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
