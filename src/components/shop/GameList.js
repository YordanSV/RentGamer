import React, { useState, useEffect, useRef } from 'react';
import GameCard from './GameCard';
import './GameList.css';

const GameList = ({ games }) => {
  const groupedGames = games.reduce((groups, game) => {
    const category = game.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(game);
    return groups;
  }, {});

  const categoriesArray = Object.keys(groupedGames).map(category => ({
    category,
    games: groupedGames[category],
    currentIndex: 0,
  }));

  const [categories, setCategories] = useState(categoriesArray);
  const intervalRef = useRef();

  const nextGame = (categoryIndex) => {
    setCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      const currentCategory = updatedCategories[categoryIndex];
      currentCategory.currentIndex = (currentCategory.currentIndex + 1) % currentCategory.games.length;
      return updatedCategories;
    });
  };

  const prevGame = (categoryIndex) => {
    setCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      const currentCategory = updatedCategories[categoryIndex];
      currentCategory.currentIndex = (currentCategory.currentIndex - 1 + currentCategory.games.length) % currentCategory.games.length;
      return updatedCategories;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCategories(prevCategories => prevCategories.map((category, index) => ({
        ...category,
        currentIndex: (category.currentIndex + 1) % category.games.length,
      })));
    }, 100000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="game-carousel">
      {categories.map((category, categoryIndex) => (
        <div key={category.category} className="category-section">
          <h2 className="category-title">{category.category}</h2>
          <div className="game-row">
            <button className="prev-btn" onClick={() => prevGame(categoryIndex)}>&#8249;</button>
            <div className="game-slider">
              <div className="game-slider-inner" style={{ transform: `translateX(-${category.currentIndex * (100 / 3)}%)` }}>
                {category.games.concat(category.games.slice(0, 3)).map((game, gameIndex) => (
                  <div key={game.id + gameIndex} className="game-item">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </div>
            <button className="next-btn" onClick={() => nextGame(categoryIndex)}>&#8250;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
