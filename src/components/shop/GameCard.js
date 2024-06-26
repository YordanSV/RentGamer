import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #001020;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 300px;
  margin: 20px;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin: 0 0 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameCard = ({ game, onAddToCart }) => {
  const getKey= (key) => {
    onAddToCart(key)
  }
  return (
    <Card>
      <ImageContainer>
        <Image src={game.image} alt={game.name} />
      </ImageContainer>
      <Content>
        <Title>{game.name}</Title>
        <Button onClick={() => getKey(game.id)}>Agregar al carrito</Button>
      </Content>
    </Card>
  );
};

export default GameCard;

// const GameCard = ({ game }) => {
//   return (
//     <div className="game-card">
//       <img src={game.image} alt={game.name} />
//       <p>{game.name}</p>
//     </div>
//   );
// };

// export default GameCard;
