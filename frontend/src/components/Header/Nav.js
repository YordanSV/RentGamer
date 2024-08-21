import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonLink = styled.a`
  background-color: #0056b3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #02376c;
  }

  @media (max-width: 768px) {
    width: 30%;
    padding: 15px;
    font-size: 18px;
  }
`;

const RegisterButton = styled(ButtonLink)`
  margin-right: 10px;
`;

const LoginButton = styled(ButtonLink)`
  background-color: #02500c;

  &:hover {
    background-color: #02400c;
  }
`;

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={isOpen ? 'nav-active' : ''}>
            <div className="menu-toggle" onClick={toggleMenu}>
                <div className={isOpen ? 'open' : ''}></div>
                <div className={isOpen ? 'open' : ''}></div>
                <div className={isOpen ? 'open' : ''}></div>
            </div>
            <ul className="nav-links">
                <li><a href="/">Inicio</a></li>
                <li><a href="/shop">Tienda</a></li>
                <li><a href="/reservation">Reserva online</a></li>
                <li><a href="/plans">Planes y precios</a></li>  
                <RegisterButton href='/register'>Registrar</RegisterButton>
                <LoginButton href='/login'>Iniciar sesión</LoginButton>
            </ul>
        </nav>
    );
}
