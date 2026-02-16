import React, { useEffect, useRef } from 'react'
import anime from 'animejs';
import Nav from './Nav'
import '../../index.css';
import Logo from './Logo'
import ShoppingCart from '../shop/ShoppingCart';

export default function Header() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    anime({
      targets: headerRef.current,
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, []);

  // Cierra el menú al hacer clic fuera
  const menuRef = useRef();
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('.menu-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className='header'>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div className={isMenuOpen ? "menu-toggle open" : "menu-toggle"} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <Logo />
      </div>
      <div ref={menuRef} style={{display: 'contents'}}>
        <Nav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
      <ShoppingCart
        onCheckout={() => {
          // Simulación: si no hay usuario logueado, redirige a /register
          const isLoggedIn = !!localStorage.getItem('user');
          if (!isLoggedIn) {
            window.location.href = '/register';
          } else {
            alert('¡Gracias por tu compra!');
          }
        }}
      />
    </header>
  )
}
