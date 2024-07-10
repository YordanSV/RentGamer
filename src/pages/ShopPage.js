import React, { useState } from 'react';
import { games } from '../data/games';
import ShoppingCart from '../components/shop/ShoppingCart';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './shopPage.css';

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleAddToCart = (key) => {
    if (cartItems.some(item => item.id === key)) {
      return;
    }
    const selectedGame = games.find(game => game.id === key);
    setCartItems([...cartItems, selectedGame]);
  };

  const handleCheckout = () => {
    console.log('Se ha pagado');
  };

  const handleRemoveToCart = (key) => {
    const updatedCartItems = cartItems.filter(item => item.id !== key);
    setCartItems(updatedCartItems);
  };

  const handleCartIconClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="shop-container">
      <h1 className='h1'>Nuestra Tienda</h1>
      <div className="cart-icon-container" onClick={handleCartIconClick}>
        🛒
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>
      {/* <ShoppingCart 
        className={isCartVisible ? 'shopping-cart visible' : 'shopping-cart'} 
        items={cartItems} 
        onCheckout={handleCheckout} 
        onRemoveToCart={handleRemoveToCart}
      /> */}
      <CategoryCarousel games={games} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ShopPage;
