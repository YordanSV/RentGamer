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

  return (
    <header ref={headerRef} className='header'>
      <Logo />
      <Nav isOpen={isMenuOpen} />
      <ShoppingCart
        onCheckout={() => console.log('Se ha pagado')}
      />
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </header>
  )
}
