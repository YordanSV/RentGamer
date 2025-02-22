import React from 'react';
import styled from 'styled-components';
import GameCarousel from './GameCarousel';



const groupByCategory = (games) => {
  return games.reduce((acc, game) => {
    if (!acc[game.category]) {
      acc[game.category] = [];
    }
    acc[game.category].push(game);
    return acc;
  }, {});
};


const CategoryCarousel = ({ games }) => {
  const gamesByCategory = groupByCategory(games);
  return (
    <div>
      {Object.keys(gamesByCategory).map(category => (
        <CarouselContainer key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <GameCarousel key={category} games={gamesByCategory[category]} />
        </CarouselContainer>
      ))}
    </div>
  );
};

export default CategoryCarousel;




const CarouselContainer = styled.div`
  width: 87%;
  margin: auto;
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  margin: 20px 0;
  text-align: center;
`;