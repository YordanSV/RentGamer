import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './CoverImage.css';

export default function CoverImage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Animación de la imagen de fondo
    anime({
      targets: imageRef.current,
      scale: [1.2, 1],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutExpo'
    });

    // Animación del título con efecto de escritura
    anime({
      targets: titleRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: 300,
      easing: 'easeOutExpo'
    });

    // Animación del subtítulo
    anime({
      targets: subtitleRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: 600,
      easing: 'easeOutExpo'
    });

    // Animación de entrada del botón
    anime({
      targets: buttonRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: 900,
      easing: 'easeOutExpo'
    });

  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('info-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cover-image">
      <img ref={imageRef} src="/cover-image.jpeg" alt="front-page" />
      <div className="text-content">
        <h1 ref={titleRef} className="animated-title">Juega sin límites</h1>
        <p ref={subtitleRef} className="subtitle">La mejor experiencia de alquiler de videojuegos</p>
        <button ref={buttonRef} className="learn-more-button" onClick={scrollToContent}>
          Saber más
        </button>
      </div>
    </div>
  );
}
