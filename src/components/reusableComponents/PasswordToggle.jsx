import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordToggle = ({ showPassword, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute right-3 top-[53px] transform -translate-y-1/2 text-gray-600"
  >
    <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} />
  </button>
);

export default PasswordToggle;
