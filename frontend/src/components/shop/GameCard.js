import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';



const GameCard = ({ game, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Card>
        <ImageContainer>
          <Image src={game.image} alt={game.name} />
        </ImageContainer>
        <Content>
          <Title>{game.name}</Title>
          <Title>{`$${game.price}`}</Title>
          <ButtonContainer>
            <Button onClick={() => onAddToCart(game.id)}>Agregar al carrito</Button>
            <Button onClick={handleOpenModal}>Ver detalles</Button>
          </ButtonContainer>
        </Content>
      </Card>
      {isModalOpen && <Modal game={game} onClose={handleCloseModal} />}
    </>
  );
};

export default GameCard;






const Card = styled.div`
  background: #001020;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 400px;
  margin: 20px;
  padding: 10px;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 10px 10px;
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
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin: 0 0 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Espacio entre los botones */
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;