// src/components/Header.js
import React, { useState } from 'react';
import './Header.css'; // Ensure this path is correct

const Header = ({ onStart }) => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartClick = () => {
    setIsStarted(true);
    onStart(); // Call the onStart prop to play the audio
  };

  return (
    <header className={`App-header ${isStarted ? 'started' : ''}`}>
      <h1 className={`title ${isStarted ? 'small' : ''}`}>Hangman</h1>
      <button onClick={handleStartClick}>Start</button>
    </header>
  );
};

export default Header;

