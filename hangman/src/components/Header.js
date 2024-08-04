import React from 'react';

const Header = ({ onStart, titleTransition, buttonTransition, gameStarted }) => {
  return (
    <header>
      <h1 className={`title ${titleTransition ? 'transitioned' : ''}`}>HANGMAN</h1>
      {!gameStarted && (
        <button className={buttonTransition ? 'transitioned' : ''} onClick={onStart}>
          Start Game
        </button>
      )}
    </header>
  );
};

export default Header;



