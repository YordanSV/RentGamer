import React from "react";
import { FaGamepad, FaPercentage } from "react-icons/fa";
import "./subscriptionPage.css"; // Importamos el CSS externo

const plans = [
  { 
    id: 1, 
    name: "Básico", 
    price: "$5.99", 
    features: [
      { text: "10% de descuento", icon: <FaPercentage /> },
      { text: "1 juego gratis", icon: <FaGamepad /> },
    ] 
  },
  { 
    id: 2, 
    name: "Estándar", 
    price: "$9.99", 
    features: [
      { text: "15% de descuento", icon: <FaPercentage /> },
      { text: "2 juegos gratis", icon: <FaGamepad /> },
    ] 
  },
  { 
    id: 3, 
    name: "Premium", 
    price: "$14.99", 
    features: [
      { text: "20% de descuento", icon: <FaPercentage /> },
      { text: "3 juegos gratis", icon: <FaGamepad /> },
    ] 
  },
];

const PlanCard = ({ plan }) => {
  return (
    <div className="plan-card">
      <h2 className="plan-title">{plan.name}</h2>
      <p className="plan-price">{plan.price}/mes</p>
      <ul className="plan-features">
        {plan.features.map((feature, idx) => (
          <li key={idx}>
            <span className="icon">{feature.icon}</span> {feature.text}
          </li>
        ))}
      </ul>
      <button className="subscribe-button">Suscribirse</button>
    </div>
  );
};

const SubscriptionPlans = () => {
  return (
    <div className="subscription-root">
      <div className="container">
        <h1 className="title">Planes de Suscripción</h1>
        <div className="plans-container">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
