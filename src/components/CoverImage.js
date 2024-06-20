import React from 'react'
import Title from './Title';
import '../index.css';

export default function CoverImage() {
  return (
    <div className="cover-image">
      <Title/>
      <img src="/cover-image.jpeg" alt="Portada" />
    </div>  )
}
