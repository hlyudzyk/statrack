'use client'

import { JSX } from "react";

interface CustomButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger';
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
                      }: CustomButtonProps): JSX.Element => {
  return (
      <button
          type="button"
          onClick={onClick}
          className={`w-full py-4 text-center rounded-xl transition cursor-pointer 
                  ${variantClasses[variant]} ${className}`}
      >
        {label}
      </button>
  );
};

export default CustomButton;
