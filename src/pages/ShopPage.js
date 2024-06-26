import React, {useState} from 'react';
import { games } from '../data/games';
import GameList from '../components/shop/GameList';
import ShoppingCart from '../components/shop/ShoppingCart';

// import './ShopPage.css'; // Si tienes estilos específicos para ShopPage

const ShopPage = () => {

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (key) => {
      console.log(key)
      const selectedGame = games.find(game => game.id === key)  //Base de datos
      setCartItems([...cartItems, selectedGame]);
      console.log(cartItems)
  };

  const handleCheckout = () => {
      console.log('Se ha pagado')
  }

  return (
    <div className="shop-container">
      <ShoppingCart items={cartItems} onCheckout={handleCheckout} /> 
      <h1>Nuestra Tienda</h1>
      <GameList games={games} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ShopPage;
