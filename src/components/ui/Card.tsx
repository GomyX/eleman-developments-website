'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const variants = {
    default: 'bg-white rounded-lg shadow-md',
    elevated: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300',
    outlined: 'bg-white border border-gray-200 rounded-lg'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = [
    variants[variant],
    paddings[padding],
    className
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
