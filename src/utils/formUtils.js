// Generic function to handle input changes
export const handleChange = (e, setter, setFormErrors) => {
  const { name, value } = e.target;
  setter((prev) => ({ ...prev, [name]: value }));
  setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
};

// Generic function to handle input for numeric fields
export const handleNumericInput = (e, setter, setFormErrors) => {
  const { name, value } = e.target;
  const numericValue = value.replace(/\D/g, '');
  setter((prev) => ({ ...prev, [name]: numericValue }));
  setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
};

// Reusable validation rules
export const validationRules = {
  required: (value, fieldName) => {
    if (value === undefined || value === null) return '';
    const trimmedValue = typeof value === 'string' ? value.trim() : value.toString();
    return trimmedValue ? '' : `Enter ${fieldName}`;
  },
  pattern: (regex, message) => (value) => {
    if (value === undefined || value === null || value === '') return '';
    return regex.test(value) ? '' : message;
  },
  email: (value) => {
    if (value === undefined || value === null || value === '') return '';
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_REGEX.test(value) ? '' : 'Please enter a valid email address';
  },
  password: (value) => {
    if (value === undefined || value === null || value === '') return '';
    return value.length >= 6 ? '' : 'Password length should be at least 6 characters';
  },
  mobile: (value) => {
    if (value === undefined || value === null || value === '') return '';
    return /^\d{10}$/.test(value) ? '' : 'Mobile Number must be 10 digits';
  },
};

// Generic form validation function
export const validateForm = (values, rules) => {
  const errors = {};
  Object.entries(rules).forEach(([field, fieldRules]) => {
    fieldRules.some((rule) => {
      const error = rule(values[field], field);
      if (error) {
        errors[field] = error;
        return true;
      }
      return false;
    });
  });
  return errors;
};
