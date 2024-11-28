import React from 'react';

export default function InputField({
  name,
  type,
  value,
  disabled,
  onChange,
  label,
  placeholder,
  error,
  onInput,
  className,
}) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <div className="flex">
        {type === 'tel' && (
          <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 dark:bg-gray-500 dark:text-white dark:border-[#4D4D4D] text-gray-500">
            +91
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyPress={onInput}
          maxLength={type === 'tel' ? 10 : undefined}
          className={`${
            type === 'tel' ? 'rounded-r-lg' : 'rounded-md'
          } border border-gray-300 bg-white placeholder:capitalize dark:border-[#4D4D4D] dark:placeholder:text-white dark:bg-transparent focus:border-primary outline-none block w-full p-2.5 leading-5 text-gray-700 dark:text-white ${
            className || ''
          } ${disabled ? '!bg-zinc-300/60' : ''}`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
