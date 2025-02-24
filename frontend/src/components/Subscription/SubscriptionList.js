import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const plans = [
  { id: 1, name: "Basic", price: "$5.99", features: ["10% discount", "1 free game"] },
  { id: 2, name: "Standard", price: "$9.99", features: ["15% discount", "2 free games"] },
  { id: 3, name: "Premium", price: "$14.99", features: ["20% discount", "3 free games"] },
];

const SubscriptionList = ({ setSelectedPlan }) => {
  return (
    <div className="flex justify-center gap-4">
      {plans.map((plan) => (
        <SubscriptionCard key={plan.id} subscription={plan} setSelectedPlan={setSelectedPlan} />
      ))}
    </div>
  );
};

export default SubscriptionList;
