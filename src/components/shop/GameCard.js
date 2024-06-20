import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} />
      <p>{game.name}</p>
    </div>
  );
};

export default GameCard;
