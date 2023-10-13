import React, { useState, useEffect } from 'react';

function ShowTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleShowTimeClick = () => {
    setClickCount(clickCount + 1);
    console.log(`Button clicked ${clickCount + 1} times.`);
  };

  useEffect(() => {
    setRenderCount(renderCount + 1);
  });

  return (
    <div className="p-4 max-w-md mx-auto text-center bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold">
        Current Time: {currentTime.toLocaleTimeString()}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600"
        onClick={handleShowTimeClick}
      >
        Show Current Time
      </button>
      <div className="text-lg mt-4">
        Button clicked: {clickCount} times
      </div>
      <div className="text-lg">
        Component rendered: {renderCount} times
      </div>
    </div>
  );
}

export default ShowTime;
