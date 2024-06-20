// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 TODOS LOS DERECHOS RESERVADOS RENTGAMER.</p>
        <nav className="footer-nav">
          <a href="#reserva">RESERVA</a>
          <a href="#precios">PLANES</a>
          <a href="#tienda">TIENDA</a>
          <a href="#contacto">CONTACTO</a>
          <a href="#politicas">POLÍTICAS</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
