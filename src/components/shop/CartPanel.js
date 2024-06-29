import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '0' : '-100%')};
  height: 100%;
  width: 300px;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ItemName = styled.span`
  font-size: 1.2em;
`;

const ItemPrice = styled.span`
  font-size: 1.2em;
`;

const Total = styled.div`
  text-align: right;
  margin-top: 20px;
  font-size: 1.5em;
`;

const Button = styled.button`
  padding: 10px 15px;
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
`;

const CartPanel = ({ games, isOpen, onClose }) => {
  const { cart } = useCart();

  const cartItems = cart.map(id => games.find(game => game.id === id));
  const total = cartItems.reduce((acc, game) => acc + game.price, 0);

  return (
    <Panel isOpen={isOpen}>
      <CartHeader>
        <h2>Carrito</h2>
        <Button onClick={onClose}>Cerrar</Button>
      </CartHeader>
      <CartItems>
        {cartItems.map(game => (
          <Item key={game.id}>
            <ItemName>{game.name}</ItemName>
            <ItemPrice>${game.price}</ItemPrice>
          </Item>
        ))}
      </CartItems>
      <Total>Total: ${total}</Total>
      <Button onClick={onClose}>Cerrar</Button>
    </Panel>
  );
};

export default CartPanel;
