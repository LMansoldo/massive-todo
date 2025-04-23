import { 
  BodyProps, 
  CellProps, 
  HeaderCellProps, 
  HeadProps, 
  RowProps, 
  TableContextProps, 
  TableProps 
} from '@shared/types/table.type';
import React, { createContext, useContext } from 'react';
import styles from './Table.module.css';

const TableContext = createContext<TableContextProps>({
  striped: false,
  hoverable: false
});

const Table = ({
  children,
  striped = false,
  hoverable = false,
  className = ''
}: TableProps) => {
  return (
    <TableContext.Provider value={{ striped, hoverable }}>
      <div className={`${styles.tableContainer} ${className}`}>
        <table className={styles.table}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

const Head = ({ children, className = '' }: HeadProps) => {
  return (
    <thead className={`${styles.tableHead} ${className}`}>
      {children}
    </thead>
  );
};

const Body = ({ children, className = '' }: BodyProps) => {
  const { striped } = useContext(TableContext);
  
  return (
    <tbody className={`${styles.tableBody} ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isEven: striped && index % 2 === 0
          });
        }
        return child;
      })}
    </tbody>
  );
};

const Row = ({ children, className = '', isEven = false }: RowProps) => {
  const { hoverable } = useContext(TableContext);
  
  return (
    <tr 
      className={`
        ${styles.tableRow} 
        ${isEven ? styles.tableRowEven : ''} 
        ${hoverable ? styles.tableRowHoverable : ''} 
        ${className}
      `}
    >
      {children}
    </tr>
  );
};

const HeaderCell = ({
  children,
  className = '',
  align = 'left'
}: HeaderCellProps) => {
  const alignClass = {
    left: styles.headerCellLeft,
    center: styles.headerCellCenter,
    right: styles.headerCellRight
  };
  
  return (
    <th
      scope="col"
      className={`${styles.headerCell} ${alignClass[align]} ${className}`}
    >
      {children}
    </th>
  );
};

const Cell = ({
  children,
  className = '',
  align = 'left',
  colSpan
}: CellProps) => {
  const alignClass = {
    left: styles.cellLeft,
    center: styles.cellCenter,
    right: styles.cellRight
  };
  
  return (
    <td
      className={`${styles.cell} ${alignClass[align]} ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export { Table };
