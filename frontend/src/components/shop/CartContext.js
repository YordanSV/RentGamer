import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (game) => {
    // Verificar si el juego ya está en el carrito
    const isGameInCart = cart.some((item) => item.id === game.id);

    if (!isGameInCart) {
      setCart([...cart, game]); // Solo agrega si no está en el carrito
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
