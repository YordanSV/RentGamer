import React, { useState, useEffect, useRef } from 'react';
import CategorySection from './CategorySection';
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCategories(prevCategories => prevCategories.map(category => ({
        ...category,
        currentIndex: (category.currentIndex + 1) % category.games.length,
      })));
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

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

  return (
    <div className="game-carousel">
      {categories.map((category, categoryIndex) => (
        <CategorySection
          key={category.category}
          category={category.category}
          games={category.games}
          currentIndex={category.currentIndex}
          nextGame={() => nextGame(categoryIndex)}
          prevGame={() => prevGame(categoryIndex)}
        />
      ))}
    </div>
  );
};

export default GameList;
