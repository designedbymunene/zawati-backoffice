import React from "react";

const PendingState = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-800 dark:border-white"></div>
        <h1 className="mt-6 text-3xl font-bold text-black dark:text-white">
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default PendingState;
