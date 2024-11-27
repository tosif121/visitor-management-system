import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Modal = ({ isOpen, onClose, title, handleSubmit, children, loading }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center dark:bg-gray-900/60 bg-black/60"
      onClick={handleOverlayClick}
    >
      <div
        className="max-w-lg bg-white dark:bg-[#131212] w-full mx-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-[#999]">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="">{children}</div>
        <div className="flex justify-end p-4 border-t mt-1 dark:border-[#999] gap-x-4">
          {handleSubmit && (
            <button onClick={handleSubmit} className="primary-btn" disabled={loading}>
              Save
            </button>
          )}
          <button onClick={onClose} className="secondary-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
