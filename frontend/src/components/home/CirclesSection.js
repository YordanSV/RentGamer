import React, { useState } from 'react';
import styled from 'styled-components';
import { useGames } from '../../contexts/GamesContext';

// Define styled components
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;
  @media (max-width: 768px) {
    margin: 30px;
  }
`;

const Circle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b2c6df
;

  @media (max-width: 768px) {
    width: 115px;
    height: 115px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin: 10px 0 5px 0;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.9em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;



const CirclesSection = () => {
  const [data, setData] = useState('');
  const { games } = useGames();

  function handleClick() {
    // Usar los datos ya precargados
    setData(games?.length || 0);
  }

  return (
    <Section>
      <Row>
        <CircleContainer>
          <Circle>
            <Image src="/rent.png" alt="Imagen 1" />
          </Circle>
          <Title>{data} Reserva</Title>
          <Button onClick={handleClick}>Saber más</Button>
        </CircleContainer>
        <CircleContainer>
          <Circle>
            <Image src="/playing.jpg" alt="Imagen 2" />
          </Circle>
          <Title>Planes</Title>
          <Button>Saber más</Button>
        </CircleContainer>
      </Row>
    </Section>
  );
};

export default CirclesSection;
