import React, { useState } from 'react';

function ArrayPairFinder() {
  const [inputArray, setInputArray] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [result, setResult] = useState([]);

  const findPairs = () => {
    // Convert the input array string to an actual array
    const array = inputArray
      .split(',')
      .map((item) => parseInt(item.trim(), 10));

    const pairs = [];
    const usedNumbers = [];

    for (let i = 0; i < array.length; i++) {
      const currentNumber = array[i];
      const complement = targetValue - currentNumber;

      if (usedNumbers.includes(complement)) {
        pairs.push([currentNumber, complement]);
      }

      usedNumbers.push(currentNumber);
    }

    setResult(pairs);
  };

  return (
    <div className="m-4 p-4 border rounded-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-2">Find Number Pairs</h2>
      <div className="mb-2">
        <label htmlFor="inputArray">Input Array (comma-separated)e.g:[1,3,8,9,4],[2,0,6,5]:</label>
        <input
          id="inputArray"
          type="text"
          className="w-full p-2 border rounded-md"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="targetValue">Target Value:</label>
        <input
          id="targetValue"
          type="number"
          className="w-full p-2 border rounded-md"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={findPairs}>
        Find Pairs
      </button>
      <div className="mt-4">
        <strong>Result:</strong>
        <ul>
          {result.map((pair, index) => (
            <li key={index}>{`[${pair[0]}, ${pair[1]}]`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArrayPairFinder;
