import React from 'react';

// Reusable Error Alert Component
const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="float-right text-red-700 hover:text-red-900"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;