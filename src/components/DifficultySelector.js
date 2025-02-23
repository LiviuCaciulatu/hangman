import React from 'react';
import './DifficultySelector.css';

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <button onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </div>
  );
};

export default DifficultySelector;

