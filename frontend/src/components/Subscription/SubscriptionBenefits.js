import React from "react";

const SubscriptionBenefits = ({ subscription }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">Benefits of {subscription.name} Plan:</h3>
      <ul className="mt-2">
        {subscription.features.map((benefit, index) => (
          <li key={index} className="text-sm">{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionBenefits;
