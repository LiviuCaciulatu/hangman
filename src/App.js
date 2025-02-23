import React, { useState, useEffect } from 'react';
import './App.css';
import audioFile from './audio/audio.mp3';
import Header from './components/Header';
import Game from './components/Game';
import DifficultySelector from './components/DifficultySelector';

function App() {
  const [audio, setAudio] = useState(null);
  const [titleTransition, setTitleTransition] = useState(false);
  const [buttonTransition, setButtonTransition] = useState(false);
  const [showDifficultyButtons, setShowDifficultyButtons] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [attempts, setAttempts] = useState(7);

  useEffect(() => {
    const newAudio = new Audio(audioFile);
    newAudio.loop = true;
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const handleStart = () => {
    setTitleTransition(true);
    setButtonTransition(true);
    setShowDifficultyButtons(true);
  };

  const handleDifficultySelection = (difficulty) => {
    if (audio) {
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
    setAttempts(difficulty === 'easy' ? 7 : 3);
    setShowDifficultyButtons(false);

    setTimeout(() => {
      setShowGame(true);
    },);
  };

  const handleEndGame = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setShowGame(false);
    setShowDifficultyButtons(false);
    setTitleTransition(false);
    setButtonTransition(false);
  };

  return (
    <div className="App">
      <Header
        onStart={handleStart}
        titleTransition={titleTransition}
        buttonTransition={buttonTransition}
        gameStarted={showGame}
      />
      {showDifficultyButtons && !showGame && (
        <DifficultySelector onSelectDifficulty={handleDifficultySelection} />
      )}
      {showGame && <Game className="fade-in" attempts={attempts} onEndGame={handleEndGame} />}
    </div>
  );
}

export default App;
