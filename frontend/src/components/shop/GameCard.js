import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import styled from 'styled-components';
import Modal from './Modal';
import { useCart } from "./CartContext"; // Importamos el contexto
import { getImageUrl } from '../../config/apiConfig';



const GameCard = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart(); // Obtenemos el carrito y la función
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Animación de entrada con Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutExpo'
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    anime({
      targets: imageRef.current,
      scale: 1.1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: imageRef.current,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Transformar ruta de imagen local a URL de Blob Storage en producción
  const imageUrl = game.image.startsWith('/img-games/') 
    ? getImageUrl(game.image.replace('/img-games/', ''))
    : game.image;

  return (
    <>
      <Card 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ImageContainer>
          <Image ref={imageRef} src={imageUrl} alt={game.name} />
        </ImageContainer>
        <Content>
          <Title>{game.name}</Title>
          <Title>{`$${game.price}`}</Title>
          <ButtonContainer>
            <Button onClick={() => addToCart(game)}>Agregar al carrito</Button>
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
  background: linear-gradient(145deg, #001020 0%, #001a35 100%);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 420px;
  margin: 16px auto;
  padding: 10px;
  border: 1px solid rgba(0, 123, 255, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(0, 123, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 123, 255, 0.3);
    border-color: rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 1024px) {
    max-width: 360px;
    margin: 12px auto;
  }

  @media (max-width: 768px) {
    max-width: 320px;
    margin: 10px auto;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 200px;
  }

  @media (max-width: 768px) {
    height: 190px;
  }

  @media (max-width: 480px) {
    height: 170px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #0a1428;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin: 0 0 10px;
  text-align: center;
  line-height: 1.2;
  min-height: 1.2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
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
  padding: 12px 20px;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 123, 255, 0.5);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(0, 123, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;