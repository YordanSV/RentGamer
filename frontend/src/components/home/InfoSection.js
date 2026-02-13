import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import styled from "styled-components";

// Estilos para la imagen del control
const LogoImage = styled.img`
  display: block;
  margin: 0 auto;
  position: relative;
  left: 7%;
  top: 101px; /* Ajusta este valor si es necesario */
  height: 200px; /* Tamaño predeterminado */
  width: auto;

  /* Adaptabilidad para móviles */
  @media (max-width: 768px) {
    height: 90px; /* Reduce el tamaño en pantallas más pequeñas */
    top: 37px; /* Ajusta la posición */
    left: 35%;
  }
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
    <div ref={sectionRef} className="info-section" id="info-section" style={{ textAlign: "center", position: "relative" }}>
      <LogoImage ref={logoRef} src="/control.png" alt="RentGamer" />
      <h3 ref={titleRef} style={{ marginTop: "-10px" }}>Descubre lo que RentGamer tiene para ti</h3> 
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
    </div>
  );
};

export default InfoSection;
