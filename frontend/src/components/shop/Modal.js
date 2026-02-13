import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import anime from 'animejs';
import styled from 'styled-components';
import { getImageUrl } from '../../config/apiConfig';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #001020;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 10px; /* Tamaño relativo al elemento padre */
  } /* 🔴 Aquí faltaba esta llave de cierre */
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff4500;
    transform: scale(1.05);
  }
`;

const Modal = ({ game, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animación de entrada del overlay
    anime({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutExpo'
    });

    // Animación de entrada del contenido
    anime({
      targets: contentRef.current,
      scale: [0.7, 1],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .6)'
    });
  }, []);

  const handleClose = () => {
    // Animación de salida
    anime({
      targets: contentRef.current,
      scale: [1, 0.7],
      opacity: [1, 0],
      duration: 300,
      easing: 'easeInExpo'
    });

    anime({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 300,
      easing: 'easeInExpo',
      complete: onClose
    });
  };

  if (!game) return null;

  // Transformar ruta de imagen local a URL de Blob Storage en producción
  const imageUrl = game.image.startsWith('/img-games/') 
    ? getImageUrl(game.image.replace('/img-games/', ''))
    : game.image;

  return ReactDOM.createPortal(
    <ModalOverlay ref={overlayRef} onClick={handleClose}>
      <ModalContent ref={contentRef} onClick={e => e.stopPropagation()}>
        <h2>{game.name}</h2>
        <img 
          src={imageUrl} 
          alt={game.name} 
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} 
        />
        <p>{game.description}</p>
        <CloseButton onClick={handleClose}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
};

export default Modal;
