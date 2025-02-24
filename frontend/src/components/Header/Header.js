import React from 'react'
import Nav from './Nav'
import '../../index.css';
import Logo from './Logo'
import ShoppingCart from '../shop/ShoppingCart';

export default function Header() {
  return (
    <header className='header'>
      <Logo />
      <Nav />
      <ShoppingCart
        onCheckout={() => console.log('Se ha pagado')}
      />
    </header>
  )
}
