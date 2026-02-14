import React from 'react';
import styled from 'styled-components';
import GameCarousel from './GameCarousel';



const groupByCategory = (games) => {
  return games.reduce((acc, game) => {
    // La API devuelve category_name en lugar de category
    const category = game.category_name || game.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(game);
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
          <CarouselInner>
            <GameCarousel key={category} games={gamesByCategory[category]} />
          </CarouselInner>
        </CarouselContainer>
      ))}
    </div>
  );
};

export default CategoryCarousel;




const CarouselContainer = styled.div`
  width: 100%;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const CarouselInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CategoryTitle = styled.h2`
  margin: 20px 0;
  text-align: center;
`;