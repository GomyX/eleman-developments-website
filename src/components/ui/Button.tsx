'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { useLocale } from 'next-intl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'phone';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/20',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary/20',
    whatsapp: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500/20',
    phone: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className={`flex items-center space-x-2 ${isRTL ? 'rtl:space-x-reverse' : ''}`}>
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : icon ? (
          <span className="w-5 h-5">{icon}</span>
        ) : null}
        <span>{children}</span>
      </div>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
