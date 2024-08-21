import React from 'react';

const InfoSection = () => {
  return (
    <div className="info-section" id='info-section'>
      <img src="/doll1.png" className="doll" alt="doll1" />
      <img src="/doll2.png" className="doll" alt="doll2"/>
      {/* <h2>Nuestro catálogo de videojuegos</h2> */}
      <h3>Descubre lo que RentGamer tiene para ti</h3>
      <p>
        En RentGamer nos esforzamos por ser el mejor servicio de alquiler de videojuegos en todo el país. 
        Ofrecemos una amplia selección de productos a precios accesibles para que puedas disfrutar de tus juegos 
        favoritos sin límites. Visítanos en línea para conocer más sobre nuestras opciones de alquiler.
      </p>
    </div>
  );
};

export default InfoSection;
