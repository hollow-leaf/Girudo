
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

// Define the props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
  children: ReactNode;
}

const AvaterButton: React.FC<ButtonProps> = ({ variant, className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={classNames(className, 'hover:shadow-inner px-4 py-2 text-sm rounded-3xl', {
        'bg-blue-500 text-white hover:bg-blue-700 hover:text-white': variant === 'primary',
        'bg-red-500 text-white hover:bg-red-700 hover:text-white': variant === 'secondary',
        'bg-white text-gray-900 hover:bg-white hover:text-blue-500': variant === 'light',
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AvaterButton;
