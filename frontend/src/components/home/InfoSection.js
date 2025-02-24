import React from 'react';
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
  return (
    <div className="info-section" id="info-section" style={{ textAlign: "center", position: "relative" }}>
      <LogoImage src="/control.png" alt="RentGamer" />
      <h3 style={{ marginTop: "-10px" }}>Descubre lo que RentGamer tiene para ti</h3> 
      <p>
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
