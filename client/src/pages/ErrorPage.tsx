import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center border border-red-400">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-gray-700 mb-4">
          You did not input everything correctly. Please check your information
          and try again.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
