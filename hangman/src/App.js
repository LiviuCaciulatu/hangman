import React, { useState, useEffect } from 'react';
import './App.css';
import audioFile from './audio/audio.mp3';
import Header from './components/Header';
import Game from './components/Game';
import Login from './components/Login';

function App() {
  const [audio, setAudio] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [titleTransition, setTitleTransition] = useState(false);

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
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setTitleTransition(true);
  }

  return (
    <div className={`App ${isLoggedIn ? 'logged-in' : ''}`}>
      <h1 className={`title ${titleTransition ? 'transitioned' : ''}`}>Hangman</h1>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : !gameStarted ? (
        <Header onStart={handleStart} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;



