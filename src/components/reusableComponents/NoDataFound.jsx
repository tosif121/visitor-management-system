import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function NoDataFound() {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg min-h-screen flex justify-center items-center gap-8">
      <FontAwesomeIcon width={50} height={50} icon={faExclamationTriangle} className="text-6xl text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No Data Found</h2>
    </div>
  );
}

export default NoDataFound;
