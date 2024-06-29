import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
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
  margin: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const GameCard = ({ game, onAddToCart }) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={game.image} alt={game.name} />
      </ImageContainer>
      <Content>
        <Title>{game.name}</Title>
        <Button onClick={() => onAddToCart(game.id)}>Agregar al carrito</Button>
        <Link to={`/shop/game/${game.id}`}>
          <Button>Ver detalles</Button>
        </Link>
      </Content>
    </Card>
  );
};

export default GameCard;
