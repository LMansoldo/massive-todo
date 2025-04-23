import { EButtonSize, EButtonVariant } from '@shared/enums/button.enum';
import { ReactNode, MouseEvent } from 'react';

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: EButtonVariant;
  fullWidth?: boolean;
  size?: EButtonSize;
}
