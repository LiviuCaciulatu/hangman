import React, { useState, useEffect } from 'react';
import './Game.css';

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

const Game = ({ attempts, onEndGame }) => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(attempts);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [input, setInput] = useState('');
  const [notification, setNotification] = useState('');

  const loadWord = async () => {
    const words = await fetchWords();
    if (words.length > 0) {
      setWord(getRandomWord(words));
      resetGame();
    } else {
      setMessage('Failed to load words.');
    }
  };

  useEffect(() => {
    loadWord();
  }, []);

  const resetGame = () => {
    setGameOver(false);
    setGuessedLetters([]);
    setRemainingAttempts(attempts);
    setMessage('');
    setNotification('');
    setInput('');
  };

  const handleGuess = (guess) => {
    if (gameOver) return;
  
    const formattedGuess = guess.toUpperCase();
  
    if (formattedGuess.length === 1) {
      setNotification('');
      if (guessedLetters.includes(formattedGuess)) {
        setNotification(`You already guessed "${formattedGuess}"`);
        setInput('');
        return;
      }
  
      const updatedGuessedLetters = [...guessedLetters, formattedGuess];
      setGuessedLetters(updatedGuessedLetters);
  
      if (!word.includes(formattedGuess)) {
        setRemainingAttempts(prev => prev - 1);
      }
  
      checkWin(updatedGuessedLetters, formattedGuess);
      setInput('');
    } else if (formattedGuess.length === word.length) {
      if (formattedGuess === word) {
        setGameOver(true);
        setMessage(`You won! The word was: ${word}`);
      } else {
        setNotification('Incorrect word! Try again.');
        setRemainingAttempts(prev => prev - 1);
        checkWin(guessedLetters);
      }
    } else {
      setNotification('One letter at a time!');
      setInput('');
    }
  };

  const checkWin = (updatedGuessedLetters, lastGuess = '') => {
    const wordGuessed = word.split('').every(letter => updatedGuessedLetters.includes(letter));
  
    if (wordGuessed) {
      setGameOver(true);
      setMessage(`You Won! The word was: ${word}`);
    } else if (remainingAttempts === 1 && !word.includes(lastGuess)) {
      setGameOver(true);
      setMessage(`Game Over! The word was: ${word}`);
    } else if (remainingAttempts <= 1 && word.includes(lastGuess)) {
      const finalWordGuessed = word.split('').every(letter => updatedGuessedLetters.includes(letter));
      if (finalWordGuessed) {
        setGameOver(true);
        setMessage(`You Won! The word was: ${word}`);
      }
    } else if (remainingAttempts <= 0) {
      setGameOver(true);
      setMessage(`Game Over! The word was: ${word}`);
    }
  };

  const handlePlayAgain = () => {
    loadWord();
  };

  const renderWord = () => {
    return word.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(input)) {
      setInput(input);
      setNotification('');
    } else {
      setNotification('Not a letter');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input && /^[A-Z]+$/.test(input)) {
      handleGuess(input);
    }
  };

  const incorrectLetters = guessedLetters.filter(letter => !word.includes(letter));
  const attemptImage = `/images/${attempts - remainingAttempts}.png`;

  return (
    <div className="game-container">
      <div className="attempt-image">
        <img src={attemptImage} alt={`Attempts remaining: ${remainingAttempts}`} />
      </div>
      {!gameOver ? (
        <>
          <p className="word">Word: {renderWord()}</p>
          <p className="attempts">Attempts remaining: {remainingAttempts}</p>
          {notification && <p className="notification">{notification}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              disabled={gameOver}
              autoFocus
              className="input-form"
            />
            <button className="submit-letter" type="submit" disabled={gameOver}>Guess</button>
          </form>
          <p className="used-letters">Used letters: {incorrectLetters.join(', ')}</p>
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
      <button className="end-game" onClick={onEndGame}>End Game</button>
      {gameOver && (
        <div className="correct-word">
          {word}
        </div>
      )}
    </div>
  );
};

export default Game;