import React from 'react';
import './CoverImage.css';

export default function CoverImage() {
  const scrollToContent = () => {
    const contentSection = document.getElementById('info-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cover-image">
      <img src="/cover-image.jpeg" alt="front-page" />
      <div className="text-content">
        <h1 className="animated-title">Juega sin líes</h1>
        <p className="subtitle">La mejor experiencia de alquiler de videojuegos</p>
        <button className="learn-more-button" onClick={scrollToContent}>
          Saber más
        </button>
      </div>
    </div>
  );
}
