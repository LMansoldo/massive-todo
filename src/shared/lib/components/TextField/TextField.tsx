import React from 'react';
import { TextFieldProps } from '@shared/types/textfield.type';
import styles from './TextField.module.css';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
  placeholder = '',
  required = false,
  className = '',
  error,
  disabled = false,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.requiredMark}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        className={`
          ${styles.input}
          ${error ? styles.errorInput : ''}
          ${className}
        `}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default TextField;
