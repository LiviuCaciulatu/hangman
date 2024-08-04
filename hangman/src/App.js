import React, { useState, useEffect } from 'react';
import './App.css';
import audioFile from './audio/audio.mp3';
import Header from './components/Header';
import Game from './components/Game';

function App() {
  const [audio, setAudio] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [titleTransition, setTitleTransition] = useState(false);
  const [buttonTransition, setButtonTransition] = useState(false);
  const [showGame, setShowGame] = useState(false);

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
    setGameStarted(true);
    setTitleTransition(true);
    setButtonTransition(true);
    
    setTimeout(() => {
      setShowGame(true);
    }, 2000);
  };

  return (
    <div className="App">
      <Header
        onStart={handleStart}
        titleTransition={titleTransition}
        buttonTransition={buttonTransition}
        gameStarted={gameStarted}
      />
      {showGame && <Game className="fade-in" />}
    </div>
  );
}

export default App;

