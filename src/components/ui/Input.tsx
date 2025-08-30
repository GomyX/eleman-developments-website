'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useLocale } from 'next-intl';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const baseClasses = 'border rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200';
  
  const classes = [
    baseClasses,
    error ? 'border-red-500' : 'border-gray-300',
    fullWidth ? 'w-full' : '',
    icon ? (isRTL ? 'pr-4 pl-10' : 'pl-10 pr-4') : 'px-4',
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
      <div className="relative">
        {icon && (
          <div className={`absolute top-3 w-5 h-5 text-gray-400 ${
            isRTL ? 'right-3' : 'left-3'
          }`}>
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={classes}
          {...props}
        />
      </div>
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
