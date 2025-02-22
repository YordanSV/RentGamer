import React, { useState } from 'react';
import { games } from '../data/games';
// import ShoppingCart from '../components/shop/ShoppingCart';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import { useCart } from '../components/shop/CartContext';
import './shopPage.css';

const ShopPage = () => {
  // const { cart } = useCart(); // Usamos el contexto
  // const [isCartVisible, setIsCartVisible] = useState(false);

  // const handleCartIconClick = () => {
  //   setIsCartVisible(!isCartVisible);
  // };

  return (
    <div className="shop-container">
      <h1 className='h1'>Nuestra Tienda</h1>

      {/* <ShoppingCart 
        className={isCartVisible ? 'shopping-cart visible' : 'shopping-cart'} 
        onCheckout={() => console.log('Se ha pagado')} 
      /> */}
      <CategoryCarousel games={games} />
    </div>
  );
};

export default ShopPage;
