import React from 'react';
import styles from '@features/todo/view/TodoItems/TodoItem.module.css';
import { Table } from '@shared/lib/components/Table/Table';
import { Checkbox } from '@shared/lib/components/Checkbox/Checkbox';
import { TextField } from '@shared/lib/components/TextField/TextField';
import { Button } from '@shared/lib/components/Button/Button';
import { GoTrash } from "react-icons/go";

interface TodoItemViewProps {
  completed: boolean;
  even: boolean;
  isEditing: boolean;
  description: string;
  editedDescription: string;
  formattedDate: string;
  onToggle: () => void;
  onDescriptionClick: () => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onDelete: () => void;
}

const TodoItemView: React.FC<TodoItemViewProps> = ({
  completed,
  even,
  isEditing,
  description,
  editedDescription,
  formattedDate,
  onToggle,
  onDescriptionClick,
  onDescriptionChange,
  onBlur,
  onKeyDown,
  onDelete
}) => {

  return (
    <>
      <Table.Row isEven={even}>
        <Table.Cell>
          {isEditing ? (
            <div className={styles.editContainer}>
              <TextField
                id="editDescription"
                type="text"
                label=""
                value={editedDescription}
                onChange={onDescriptionChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className={styles.editInput}
                autoFocus
              />
            </div>
          ) : (
            <>
              <span 
                onClick={onDescriptionClick}
                className={styles.todoDescription}
              >
                {description}
              </span>
            </>
          )}
        </Table.Cell>
        <Table.Cell align="center">{formattedDate}</Table.Cell>
        <Table.Cell align="center">
          <Checkbox
            checked={completed}
            onChange={onToggle}
          />
        </Table.Cell>
        <Table.Cell align="center">
          <Button 
            onClick={onDelete}
            aria-label="Delete todo"
          >
            <GoTrash />
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default TodoItemView;