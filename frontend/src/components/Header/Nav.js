import React from 'react';

export default function Nav({ isOpen, onClose }) {
    // Cierra el menú al hacer click en un enlace
    const handleLinkClick = () => {
        if (onClose) onClose();
    };
    return (
        <nav className={isOpen ? 'nav-active' : ''}>
            <ul className="nav-links">
                <li><a href="/" onClick={handleLinkClick}>Inicio</a></li>
                <li><a href="/shop" onClick={handleLinkClick}>Tienda</a></li>
                <li><a href="/booking" onClick={handleLinkClick}>Reserva online</a></li>
                <li><a href="/subscription" onClick={handleLinkClick}>Planes y precios</a></li>        
            </ul>
        </nav>
    );
}
