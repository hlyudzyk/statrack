'use client'

import { JSX } from "react";

interface CustomButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

const variantClasses: Record<NonNullable<CustomButtonProps['variant']>, string> = {
  default: 'bg-lightbase hover:bg-lightbase-hover text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-yellow-300 hover:bg-yellow-400 text-black',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const CustomButton = ({
                        label,
                        onClick,
                        className = '',
                        variant = 'default',
                        disabled = false,
                        ...props
                      }: CustomButtonProps): JSX.Element => {
  return (
      <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          data-testid={props['data-testid']}
          className={`w-full py-4 text-center rounded-xl transition 
        ${disabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' : `${variantClasses[variant]} cursor-pointer`} 
        ${className}`}
      >
        {label}
      </button>
  );
};

export default CustomButton;
