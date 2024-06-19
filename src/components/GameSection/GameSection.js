import React from 'react';
import ImageSlider from './ImageSliderPS5'
const GameSection = () => {
  const images1 = [
    'game1.png',
    'game2.png'
  ];

  const images2 = [
    'game3.png',
    'game4.png'
  ];

  return (
    <div className="game-section">
      <ImageSlider images={images2}/>
      <div className="text-container" id="border-bottom">
        <h2>PlayStation 5</h2>
        <p>
          Uno de nuestros juegos más populares, ¡y por una buena razón! Este
          juego es el epítome de la emoción y la aventura. Con gráficos
          impresionantes y una jugabilidad emocionante, no querrás perderte
          esta experiencia única. Ven y prueba PlayStation 5 hoy mismo. ¡Estamos seguros
          de que te encantará!
        </p>
      </div>
      <div className="text-container">
        <h2>Xbox Game Pass</h2>
        <p>
          ¿Quieres jugar los mejores juegos sin tener que comprarlos todos?
          Entonces este es el juego para ti. Con una amplia selección de juegos,
          desde los más populares hasta los más exclusivos, no te cansarás de
          Xbox Game Pass. Ven y descubre Xbox Game Pass.
        </p>
      </div>
      <ImageSlider images={images1}/>
    </div>
  );
};


export default GameSection;
