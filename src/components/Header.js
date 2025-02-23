import React from 'react';
import './Header.css';

const Header = ({ onStart, titleTransition, buttonTransition, gameStarted }) => {
  return (
    <header>
      <h1 className={`title ${titleTransition ? 'transitioned' : ''}`}>HANGMAN</h1>
      {!gameStarted && (
        <button className={`start-button ${buttonTransition ? 'transitioned' : ''}`} onClick={onStart}>
          Start Game!
        </button>
      )}
    </header>
  );
};

export default Header;




