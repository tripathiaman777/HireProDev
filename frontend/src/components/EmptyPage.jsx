import React from 'react';

function EmptyState() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Nothing to show here
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Please order something to generate bills.
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
