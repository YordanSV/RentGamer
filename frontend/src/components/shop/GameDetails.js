import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  background: #001020;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-top: 20px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff4500;
  }
`;

const GameDetails = ({ games }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find(game => game.id.toString() === id);

  if (!game) {
    return <p>Juego no encontrado</p>;
  }

  return (
    <DetailsContainer>
      <Title>{game.name}</Title>
      <Image src={game.image} alt={game.name} />
      <Description>{game.description}</Description>
      <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
    </DetailsContainer>
  );
};

export default GameDetails;
