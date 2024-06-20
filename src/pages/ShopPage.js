import React from 'react';
import { games } from '../data/games';
import GameList from '../components/shop/GameList';
// import './ShopPage.css'; // Si tienes estilos específicos para ShopPage

const ShopPage = () => {
  return (
    <div className="shop-container">
      <h1>Nuestra Tienda</h1>
      <GameList games={games} />
    </div>
  );
};

export default ShopPage;
