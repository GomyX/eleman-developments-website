'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { useLocale } from 'next-intl';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  placeholder,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const baseClasses = 'border rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 bg-white';
  
  const classes = [
    baseClasses,
    error ? 'border-red-500' : 'border-gray-300',
    fullWidth ? 'w-full' : '',
    isRTL ? 'text-right' : 'text-left',
    className
  ].join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
          isRTL ? 'text-right' : 'text-left'
        }`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={classes}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
