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

  const scrollToContent = (e) => {
    // Prevenir comportamiento por defecto y propagación
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const contentSection = document.getElementById('info-section');
    if (contentSection) {
      // Primero, reseteamos las animaciones eliminando y reconstruyendo el contenido
      const logo = contentSection.querySelector('img');
      const title = contentSection.querySelector('h3');
      const text = contentSection.querySelector('p');
      
      if (logo && title && text) {
        // Resetear estados iniciales
        anime.set([logo, title, text], {
          opacity: 0
        });
        
        // Scroll suave a la sección
        contentSection.scrollIntoView({ behavior: 'smooth' });
        
        // Lanzar animaciones después de un breve delay
        setTimeout(() => {
          // Animación del logo con rotación
          anime({
            targets: logo,
            rotate: [360, 0],
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutElastic(1, .6)'
          });

          // Animación del título
          anime({
            targets: title,
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo'
          });

          // Animación del texto
          anime({
            targets: text,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1200,
            delay: 600,
            easing: 'easeOutExpo'
          });
        }, 500);
      } else {
        contentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTouchEnd = (e) => {
    scrollToContent(e);
  };

  return (
    <div className="cover-image">
      <img ref={imageRef} src="/cover-image.jpeg" alt="front-page" />
      <div className="text-content">
        <h1 ref={titleRef} className="animated-title">Juega sin límites</h1>
        <p ref={subtitleRef} className="subtitle">La mejor experiencia de alquiler de videojuegos</p>
        <button 
          ref={buttonRef} 
          className="learn-more-button" 
          onClick={scrollToContent}
          onTouchEnd={handleTouchEnd}
        >
          Saber más
        </button>
      </div>
    </div>
  );
}
