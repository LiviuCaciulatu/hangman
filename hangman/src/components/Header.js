import React from 'react';

const Header = ({ onStart }) => {
  return (
    <div>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default Header;

