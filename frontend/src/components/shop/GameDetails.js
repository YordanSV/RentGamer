import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGames } from '../../contexts/GamesContext';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games, loading, error } = useGames();

  // Buscar el juego en los datos precargados
  const game = useMemo(() => {
    return games.find(g => g.id === parseInt(id));
  }, [games, id]);

  if (loading) {
    return (
      <DetailsContainer>
        <p>Cargando detalles del juego...</p>
      </DetailsContainer>
    );
  }

  if (error) {
    return (
      <DetailsContainer>
        <p style={{ color: 'red' }}>Error al cargar el juego: {error}</p>
        <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
      </DetailsContainer>
    );
  }

  if (!game) {
    return (
      <DetailsContainer>
        <p>Juego no encontrado</p>
        <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <Title>{game.name}</Title>
      {game.image && <Image src={game.image} alt={game.name} />}
      {game.description && <Description>{game.description}</Description>}
      {game.price && <Price>Precio: ${game.price}</Price>}
      {game.category_name && <Category>Categoría: {game.category_name}</Category>}
      <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
    </DetailsContainer>
  );
};

export default GameDetails;





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

const Price = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: #4CAF50;
  margin: 15px 0;
`;

const Category = styled.p`
  font-size: 1.1em;
  color: #888;
  margin: 10px 0;
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