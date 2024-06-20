import React from 'react'
import Nav from './Nav'
import '../../index.css';
import Logo from './Logo'

export default function Header() {
  return (
    <header className='header'>
        <Logo />
        <Nav />
    </header>
  )
}
