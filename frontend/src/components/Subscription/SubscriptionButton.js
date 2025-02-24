import React from "react";

const SubscriptionButton = ({ subscription }) => {
  return (
    <div className="mt-4 text-center">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
        Subscribe to {subscription.name} Plan
      </button>
    </div>
  );
};

export default SubscriptionButton;
