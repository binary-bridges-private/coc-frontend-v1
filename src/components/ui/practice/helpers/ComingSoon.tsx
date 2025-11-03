import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-gray-50 rounded-lg p-8 text-center">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-800">Feature Coming Soon</h2>
      <p className="max-w-md mb-6 text-gray-600">
        We're working hard to bring you this feature. Please check back later!
      </p>
      <button onClick={() => { navigate("/practice") }} className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
        Go To Practice
      </button>
    </div>
  );
};

export default ComingSoon;