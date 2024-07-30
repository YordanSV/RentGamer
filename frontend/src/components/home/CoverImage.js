import React from 'react'
import Title from './Title';

export default function CoverImage() {
  return (
    <div className="cover-image">
      <Title/>
      <img src="/cover-image.jpeg" alt="Portada" />
    </div>  )
}
