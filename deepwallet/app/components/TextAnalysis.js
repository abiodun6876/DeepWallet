'use client'
import React, { useState } from 'react';

const TextAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [maxConsecutiveChars, setMaxConsecutiveChars] = useState('');

  const findMaxConsecutiveChars = (text) => {
    let maxCount = 0;
    let currentChar = '';
    let charCount = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === text[i - 1]) {
        charCount++;
      } else {
        charCount = 1;
      }

      if (charCount > maxCount) {
        maxCount = charCount;
        currentChar = text[i];
      } else if (charCount === maxCount) {
        currentChar += `,${text[i]}`;
      }
    }

    if (maxCount > 1) {
      setMaxConsecutiveChars(`${currentChar}: ${maxCount}`);
    } else {
      setMaxConsecutiveChars('No consecutive characters found.');
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    findMaxConsecutiveChars(text);
  };

  return (
    <div className="container mx-auto text-center mt-5">
      <h1 className="text-2xl text-gray-800">Text Analysis</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 mt-4"
      />
      <p className="text-lg text-gray-600 mt-4">
        Max Consecutive Characters: {maxConsecutiveChars}
      </p>
    </div>
  );
};

export default TextAnalysis;
