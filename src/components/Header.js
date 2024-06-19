import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import '../index.css';

export default function Header() {
  return (
    <header className='header'>
        <Logo />
        <Nav />
    </header>
  )
}
