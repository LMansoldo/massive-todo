import React, { ChangeEvent } from 'react';
import { ICheckboxProps } from '@shared/types/checkbox.type';
import styles from './Checkbox.module.css';

export const Checkbox: React.FC<ICheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
  disabled = false,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={styles.checkboxInput}
        />
        <span className={styles.checkmark}></span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
