import React from 'react';
import ImageSlider from './ImageSliderPS5';
import XboxIcon from './XboxIcon';
import PlaystationIcon from './PlaystationIcon';

const images1 = [
  'game1.png',
  'game2.png'
];

const images2 = [
  'game3.png',
  'game4.png'
];

const GameSection = () => {
  return (
    <div className="game-section">
      <ImageSlider images={images2} />
      
      <div className="text-container" id="border-bottom">
        <PlaystationIcon />
        <h2>PlayStation 5</h2>
        <p>
          Sumérgete en la nueva generación de videojuegos con <strong>PlayStation 5</strong>. 
          Disfruta de <strong>gráficos ultra realistas</strong>, tiempos de carga casi instantáneos y una jugabilidad 
          fluida que te hará vivir cada aventura como nunca antes. Desde emocionantes títulos exclusivos 
          hasta experiencias envolventes en 4K, PS5 te ofrece el mejor entretenimiento. 
          <br /><br />
          🎮 ¡Ven y alquila tu juego favorito hoy mismo!
        </p>
      </div>

      <div className="text-container">
        <XboxIcon />
        <h2>Xbox Game Pass</h2>
        <p>
          ¿Te gustaría acceder a una biblioteca infinita de juegos sin necesidad de comprarlos? 
          Con <strong>Xbox Game Pass</strong>, tienes cientos de títulos al alcance de tu mano, desde los éxitos más 
          populares hasta los exclusivos más esperados. Juega en consola, PC o incluso en la nube, y 
          descubre nuevas aventuras todos los meses.
          <br /><br />
          🚀 ¡Explora, juega y disfruta sin límites con Xbox Game Pass!
        </p>
      </div>

      <ImageSlider images={images1} />
    </div>
  );
};

export default GameSection;
