import React from 'react';
import { IButtonProps } from '@shared/types/button.type';
import { EButtonSize, EButtonVariant } from '@shared/enums/button.enum';
import styles from './Button.module.css';

export const Button: React.FC<IButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  variant = EButtonVariant.PRIMARY,
  fullWidth = false,
  size = EButtonSize.MEDIUM,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
