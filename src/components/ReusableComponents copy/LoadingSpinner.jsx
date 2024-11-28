import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin">
        <FontAwesomeIcon width={50} hanging={50} icon={faSpinner} className="text-6xl text-primary" />
      </div>
      <span className="ml-4 text-xl text-gray-700 dark:text-white">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
