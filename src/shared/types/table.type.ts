import { ReactNode } from 'react';

export type AlignType = 'left' | 'center' | 'right';

export interface TableContextProps {
  striped: boolean;
  hoverable: boolean;
}

export interface TableProps {
  children: ReactNode;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

export interface HeadProps {
  children: ReactNode;
  className?: string;
}

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

export interface RowProps {
  children: ReactNode;
  className?: string;
  isEven?: boolean;
}

export interface HeaderCellProps {
  children: ReactNode;
  className?: string;
  align?: AlignType;
}

export interface CellProps {
  children: ReactNode;
  className?: string;
  align?: AlignType;
  colSpan?: number;
}
