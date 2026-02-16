import React from 'react';

export default function Nav({ isOpen }) {
    return (
        <nav className={isOpen ? 'nav-active' : ''}>
            <ul className="nav-links">
                <li><a href="/">Inicio</a></li>
                <li><a href="/shop">Tienda</a></li>
                <li><a href="/booking">Reserva online</a></li>
                <li><a href="/subscription">Planes y precios</a></li>        
            </ul>
        </nav>
    );
}
