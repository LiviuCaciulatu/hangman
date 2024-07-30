// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import audioFile from './audio/audio.mp3';
import Header from './components/Header';
import Game from './components/Game';

function App() {
  const [audio, setAudio] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const newAudio = new Audio(audioFile);
    newAudio.loop = true; // Loop the audio
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const handleStart = () => {
    if (audio) {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <Header onStart={handleStart} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;

