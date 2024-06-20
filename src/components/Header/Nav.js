import React, { useState } from 'react';

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
                <li><a href="#reservation">Reserva online</a></li>
                <li><a href="#plans">Planes y precios</a></li>        
            </ul>
        </nav>
    );
}
