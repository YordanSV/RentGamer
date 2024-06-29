import React, {useState} from 'react';
import { games } from '../data/games';
// import {GameCarousel} from '../components/shop/GameCard';
import ShoppingCart from '../components/shop/ShoppingCart';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
      <h1>Nuestra Tienda</h1>
      <ShoppingCart items={cartItems} onCheckout={handleCheckout} /> 
      <CategoryCarousel games={games} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ShopPage;
