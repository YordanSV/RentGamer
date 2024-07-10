// import React, { useState } from 'react';
// import { games } from "../../data/games";
// import ShoppingCart from './ShoppingCart';
// import CategoryCarousel from './CategoryCarousel';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const HandleShoppingCart = () => {
//     const [cartItems, setCartItems] = useState([]);

//     const handleAddToCart = (key) => {
//         console.log(key)
//         const selectedGame = games.find(game => game.id === key)  //Base de datos
//         setCartItems([...cartItems, selectedGame]);
//         // const x = items.length + 1
//         console.log(cartItems)
//     };
  
//     const handleCheckout = () => {
//         console.log('Se ha pagado')
//     }
  
//     const handleRemoveToCart = (key) => {
//         const SetCart = games.filter(game => game.id !== key)
//         setCartItems(SetCart)
//     }
    
//     return (
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//             {/* <ShoppingCart items={cartItems} onCheckout={handleCheckout} onRemoveToCart={handleRemoveToCart}/>  */}
//             {/* <CategoryCarousel games={games} onAddToCart={handleAddToCart} /> */}
//       </div>
//     )
// }

// export default HandleShoppingCart

