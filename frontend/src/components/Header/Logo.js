import React from "react";
import styled from "styled-components";


const NavLogo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  max-height: 55px;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 48px;
  height: 100%;
  @media (min-width: 769px) {
    margin-left: 32px;
  }
`;

const LogoImage = styled.img`
  max-height: 40px;
  width: auto;
  height: auto;
  @media (min-width: 769px) {
    max-height: 60px;
  }
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
