// src/components/Game.js
import React, { useState, useEffect } from 'react';
import './Game.css'; // Ensure this is up-to-date

const fetchWords = async () => {
  try {
    const response = await fetch('/words.txt');
    const text = await response.text();
    const words = text.split(',').map(word => word.trim()).filter(word => word.length > 0);
    return words;
  } catch (error) {
    console.error('Error fetching words:', error);
    return [];
  }
};

const getRandomWord = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

const Game = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(7); // Start with 7 attempts
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const loadWord = async () => {
      const words = await fetchWords();
      if (words.length > 0) {
        setWord(getRandomWord(words));
        setGameOver(false);
        setRemainingAttempts(7);
        setGuessedLetters([]);
        setMessage('');
      } else {
        setMessage('Failed to load words.');
      }
    };

    loadWord();
  }, []);

  const handleGuess = (letter) => {
    if (gameOver) return;
    if (guessedLetters.includes(letter)) return;
  
    const updatedGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedGuessedLetters);
  
    if (!word.includes(letter)) {
      const newRemainingAttempts = remainingAttempts - 1;
      setRemainingAttempts(newRemainingAttempts);
      checkWin(updatedGuessedLetters, newRemainingAttempts);
    } else {
      checkWin(updatedGuessedLetters, remainingAttempts);
    }
  };

  const checkWin = (updatedGuessedLetters, updatedRemainingAttempts) => {
    const wordGuessed = word.split('').every(letter => updatedGuessedLetters.includes(letter));
  
    if (wordGuessed) {
      setGameOver(true);
      setMessage('You Won!');
    } else if (updatedRemainingAttempts <= 0) {
      setGameOver(true);
      setMessage(`Game Over! \nThe word was: ${word}`);
    }
  };
  
  const handlePlayAgain = () => {
    setGameOver(false);
    setGuessedLetters([]);
    setRemainingAttempts(7);
    setMessage('');
    const loadWord = async () => {
      const words = await fetchWords();
      if (words.length > 0) {
        setWord(getRandomWord(words));
      }
    };
    loadWord();
  };

  const renderWord = () => {
    return word.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
  };

  const rows = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ];

  // Determine the image path based on remaining attempts
  const attemptImage = `/images/${7 - remainingAttempts}.png`;

  return (
    <div className="game-container">
      <div className="attempt-image">
        <img src={attemptImage} alt={`Attempts remaining: ${remainingAttempts}`} />
      </div>
      {!gameOver ? (
        <>
          <p className="word">Word: {renderWord()}</p>
          <p className="attempts">Attempts remaining: {remainingAttempts}</p>
          <div className="keyboard">
            {rows.map((row, index) => (
              <div key={index} className="keyboard-row">
                {row.split('').map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter) || gameOver}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2>
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>
          <button className="play-again" onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
