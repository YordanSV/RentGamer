import React from "react";
import styled from "styled-components";

const NavLogo = styled.div`
  height: 100%; /* Ocupa toda la altura del header */
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a`
  display: flex; 
  align-items: center;
  padding-left: 30%;
  height: 100%; /* Ajusta la altura del enlace */
`;

const LogoImage = styled.img`
  height: 100%; /* Hace que el logo sea grande pero no sobresalga */
  width: auto; /* Mantiene la proporción */
`;

export default function Logo() {
  return (
    <NavLogo>
      <LogoLink href="/">
        <LogoImage src="/logo.png" alt="RentGamer" />
      </LogoLink>
    </NavLogo>
  );
}
