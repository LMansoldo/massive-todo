import React, { ReactNode } from 'react';
import { ECardVariant } from '@shared/enums/card.enum';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: ECardVariant;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = ECardVariant.Primary
}) => {
  return (
    <div 
      className={`${styles.card} ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
