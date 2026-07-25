'use client';

import * as React from 'react';
import { cn } from '../../lib/utils.js';

export const Button = React.forwardRef(({ className, variant = 'default', asChild = false, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 disabled:pointer-events-none disabled:opacity-50 text-xs px-3 py-1.5';
  const variants = {
    default: 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm',
    outline: 'border border-violet-200 bg-white text-gray-800 hover:bg-violet-50 hover:text-violet-900',
    ghost: 'hover:bg-violet-50 text-gray-700',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant] || variants.default, className)}
      {...props}
    />
  );
});

Button.displayName = 'Button';
