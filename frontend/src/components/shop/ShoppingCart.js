import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from "./CartContext";

const ShoppingCart = ({ onCheckout }) => {
  const { cart, removeFromCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);

  // Cerrar carrito si se hace clic fuera o en el icono
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest(".cart-icon")
      ) {
        setIsCartVisible(false);
      }
    };

    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  const handleCartIconClick = () => {
    setIsCartVisible((prev) => !prev); // Alternar visibilidad
  };

  const amount = cart.length;
  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <>
      {/* Icono del carrito */}
      <CartIconContainer className="cart-icon" onClick={handleCartIconClick}>
        🛒
        {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
      </CartIconContainer>

      {/* Fondo oscuro cuando el carrito está abierto */}
      {isCartVisible && <Backdrop onClick={handleCartIconClick} />}

      {/* Contenedor del carrito en forma de menú lateral */}
      <CartContainer ref={cartRef} isVisible={isCartVisible}>
        <CartHeader>CARRITO DE COMPRAS</CartHeader>
        <CloseButton onClick={handleCartIconClick}>✖</CloseButton>
        <CartItemsContainer>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <CartItem key={index}>
                <Image src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price || 0}</ItemPrice>
                </ItemInfo>
                <RemoveButton onClick={() => removeFromCart(item.id)}>Eliminar</RemoveButton>
              </CartItem>
            ))
          ) : (
            <EmptyCart>El carrito está vacío</EmptyCart>
          )}
        </CartItemsContainer>
        <Total>
          <span>Total:</span>
          <span>${total}</span>
        </Total>
        <Total>
          <span>Cantidad:</span>
          <span>{amount}</span>
        </Total>
        <CheckoutButton onClick={onCheckout}>Pagar</CheckoutButton>
      </CartContainer>
    </>
  );
};

export default ShoppingCart;

const CartIconContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  align-items: center;
  background: #007bff;
  color: white;
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 2000;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 5px;
    top: 5px;
      right: 8px;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  font-size: 14px;
  border-radius: 50%;
  padding: 2px 6px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: #001020;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1500;
  overflow-y: auto;
  transform: ${({ isVisible }) => (isVisible ? "translateX(0)" : "translateX(100%)")};

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const CartHeader = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;

const CartItemsContainer = styled.div`
  max-height: 65vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #111;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: row;  /* Mantiene todo en una fila */
    justify-content: space-between;
    gap: 10px;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  
  @media (max-width: 768px) {
    width: 50px; /* Ajuste para móviles */
    height: 50px;
  }
`;
const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: row; /* Asegura que el nombre y precio estén en la misma fila */
    justify-content: space-between;
    width: 100%;
  }
`;

const ItemName = styled.span`
  font-size: 1em;
  color: white;
  font-weight: bold;
  text-align: left;
`;

const ItemPrice = styled.span`
  font-size: 1em;
  color: #00ffcc;
  font-weight: bold;
  margin-left: 10px;
`;
const EmptyCart = styled.p`
  text-align: center;
  color: white;
  font-size: 1.2em;
  padding: 20px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-top: 2px solid #000;
  color: white;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  background-color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
const RemoveButton = styled.button`
  padding: 6px 10px;
  font-size: 0.8em;
  color: white;
  background-color: #ff4444;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  
  &:hover {
    background-color: #cc0000;
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 0.8em;
  }
`;