// import React, { useState } from 'react';
// import { games } from "../../data/games";
// import ShoppingCart from './ShoppingCart';
// import GameCard from './GameCard';

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
  
    
//     return (
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//             <ShoppingCart items={cartItems} onCheckout={handleCheckout } onAddToCart={onAddToCart} /> 
//       </div>
//     )
// }

// export default HandleShoppingCart