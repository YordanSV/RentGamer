import React from 'react';
import '../gameSection.css';

const GameSection = () => {
  return (
    <div className="game-section">
      <div className="image-container">
        <img src="/game1.png" alt="Game 1" className="game-image" />
      </div>
      <div className="text-container">
        <h2>PlayStation 5</h2>
        <p>
          Uno de nuestros juegos más populares, ¡y por una buena razón! Este
          juego es el epítome de la emoción y la aventura. Con gráficos
          impresionantes y una jugabilidad emocionante, no querrás perderte
          esta experiencia única. En RentGamer, ofrecemos una amplia variedad
          de opciones para que puedas elegir la que mejor se adapte a sus
          necesidades. Ven y prueba PlayStation 5 hoy mismo. ¡Estamos seguros
          de que te encantará!
        </p>
      </div>
      <div className="text-container">
        <h2>Xbox Game Pass</h2>
        <p>
          ¿Quieres jugar los mejores juegos sin tener que comprarlos todos?
          Entonces este es el juego para ti. Con una amplia selección de juegos,
          desde los más populares hasta los más exclusivos, no te cansarás de
          Xbox Game Pass. En RentGamer, ofrecemos una variedad de opciones para
          que puedas elegir la que mejor se adapte a tus necesidades. Ven y
          descubre Xbox Game Pass hoy mismo. ¡Estamos seguros de que te
          encantará!
        </p>
      </div>
      <div className="image-container">
        <img src="/game2.png" alt="Game 2" className="game-image" />
      </div>
    </div>
  );
};

export default GameSection;
