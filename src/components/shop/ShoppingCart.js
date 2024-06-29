// ShoppingCart.js
import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  width: 400px;
  background: #001020;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
`;

const CartHeader = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const ItemPrice = styled.span`
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-top: 2px solid #000;
  margin-top: 20px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    padding: 8px;
  }
`;

const ShoppingCart = ({ items, onCheckout }) => {
    const amount = items.length;
    const total = items.reduce((acc, item) => acc + item.price,0)
    return (
        <CartContainer>
            <CartHeader>Carrito de Compras</CartHeader>
            {items.map((item, index) => (
                <CartItem key={index}>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                </CartItem>
            ))}
            <Total>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </Total>
            <Total>
                <span>Cantidad:</span>
                <span>{amount}</span>
            </Total>
            <CheckoutButton onClick={onCheckout}>Pagar</CheckoutButton>
        </CartContainer>
    );
};

export default ShoppingCart;
