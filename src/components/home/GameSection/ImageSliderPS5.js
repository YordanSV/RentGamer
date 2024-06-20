import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import './gameSection.css';

// Definir el contenedor del slider y la imagen
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; // Ajusta según tus necesidades
  overflow: hidden;
  margin: auto;
  height: 550px; // Ajusta según tus necesidades
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // Ajusta la imagen para cubrir todo el contenedor sin distorsión
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  animation: ${props => (props.fade ? fadeIn : fadeOut)} 1s forwards;

    @media (max-width: 1px) {
    height: 1px; /* Permite que la altura se ajuste automáticamente */
    max-height: 1vh; /* Limita la altura máxima de la imagen en dispositivos móviles */
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  transform: translateY(-50%);
  ${props => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const nextImage = useCallback(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
            setFade(true);
        }, 1000); // Duración de la animación
    }, [currentImageIndex, images.length]);

    const prevImage = useCallback(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
            setFade(true);
        }, 1000); // Duración de la animación
    }, [currentImageIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <SliderContainer>
            {images.map((image, index) => (
                <SliderImage
                    key={index}
                    src={image}
                    alt="Sliding images"
                    fade={fade && currentImageIndex === index}
                    style={{ opacity: currentImageIndex === index ? 1 : 0 }}
                />
            ))}
            <Arrow direction="left" onClick={prevImage}>
                &#9664;
            </Arrow>
            <Arrow direction="right" onClick={nextImage}>
                &#9654;
            </Arrow>
        </SliderContainer>
    );
};

export default ImageSlider;
