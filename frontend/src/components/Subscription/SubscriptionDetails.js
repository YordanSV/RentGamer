import React from "react";

const SubscriptionDetails = ({ subscription }) => {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">{subscription.name} Plan Details</h2>
      <p className="text-lg font-semibold">{subscription.price} / month</p>
      <ul className="mt-2">
        {subscription.features.map((feature, index) => (
          <li key={index} className="text-sm">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionDetails;
