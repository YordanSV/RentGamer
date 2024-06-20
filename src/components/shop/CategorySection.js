import React from 'react';
import GameCard from './GameCard';
import { useSwipeable } from 'react-swipeable';
import './CategorySection.css';

const CategorySection = ({ category, games, currentIndex, nextGame, prevGame }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => nextGame(),
    onSwipedRight: () => prevGame(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="game-row">
        <button className="prev-btn" onClick={prevGame}>&#8249;</button>
        <div className="game-slider" {...handlers}>
          <div className="game-slider-inner" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
            {games.concat(games.slice(0, 3)).map((game, gameIndex) => (
              <div key={game.id + gameIndex} className="game-item">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
        <button className="next-btn" onClick={nextGame}>&#8250;</button>
      </div>
    </div>
  );
};

export default CategorySection;
