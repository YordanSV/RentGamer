import React from "react";

const SubscriptionCard = ({ subscription, setSelectedPlan }) => {
  return (
    <div
      className="p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
      onClick={() => setSelectedPlan(subscription)}
    >
      <h2 className="text-xl font-bold">{subscription.name}</h2>
      <p className="text-gray-600">{subscription.price}</p>
      <ul className="mt-2">
        {subscription.features.map((feature, index) => (
          <li key={index} className="text-sm">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionCard;
