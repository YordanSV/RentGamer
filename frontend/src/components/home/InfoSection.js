import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import styled from "styled-components";

// Contenedor principal de la sección
const SectionContainer = styled.div`
  text-align: center;
  position: relative;
  padding-top: 170px;
  
  @media (max-width: 768px) {
    padding-top: 100px;
  }
  
  @media (max-width: 480px) {
    padding-top: 75px;
  }
`;

// Estilos para la imagen del control
const LogoImage = styled.img`
  display: block;
  position: absolute;
  left: 50%;
  top: 85px;
  transform: translateX(-50%);
  height: 200px;
  width: auto;
  z-index: 5;

  /* Adaptabilidad para móviles */
  @media (max-width: 768px) {
    height: 120px;
    top: 45px;
  }
  
  @media (max-width: 480px) {
    height: 90px;
    top: 35px;
  }
`;

const Title = styled.h3`
  margin-top: 0px;
  position: relative;
  z-index: 10;
  background: transparent;
`;

const InfoSection = () => {
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animación del logo con rotación
            anime({
              targets: logoRef.current,
              rotate: [360, 0],
              scale: [0, 1],
              opacity: [0, 1],
              duration: 1500,
              easing: 'easeOutElastic(1, .6)'
            });

            // Animación del título
            anime({
              targets: titleRef.current,
              translateX: [-100, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: 300,
              easing: 'easeOutExpo'
            });

            // Animación del texto con efecto de fade
            anime({
              targets: textRef.current,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1200,
              delay: 600,
              easing: 'easeOutExpo'
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionContainer ref={sectionRef} className="info-section" id="info-section">
      <LogoImage ref={logoRef} src="/control.png" alt="RentGamer" />
      <Title ref={titleRef}>Descubre lo que RentGamer tiene para ti</Title> 
      <p ref={textRef}>
        En <strong>RentGamer</strong>, llevamos la pasión por los videojuegos al siguiente nivel. 
        Te ofrecemos el mejor servicio de <strong>alquiler de videojuegos</strong> en todo el país, con una 
        <strong> amplia selección de títulos</strong> para que juegues sin gastar de más. 
        <br /><br />
        ✅ Juegos de última generación. <br />
        ✅ Precios accesibles para todos.<br />
        ✅ Alquila fácil y rápido desde la<br /> 
        comodidad de tu hogar. <br /><br />
      </p>
    </SectionContainer>
  );
};

export default InfoSection;
