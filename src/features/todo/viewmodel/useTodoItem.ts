import { useState } from 'react';
import { ITodoItemActions, ITodoItemData } from '@features/todo/model/todo.types';

export const useTodoItem = (
  todoItem: ITodoItemData,
  actions: ITodoItemActions
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(todoItem.description);

  const handleDescriptionClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleBlur = () => {
    if (editedDescription.trim() !== todoItem.description && editedDescription.trim() !== '') {
      actions.onUpdateDescription(todoItem.id, editedDescription.trim());
    }
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleToggle = () => {
    actions.onToggle(todoItem.id);
  };

  const handleDelete = () => {
    actions.onDelete(todoItem.id);
  };

  return {
    state: {
      isEditing,
      editedDescription,
      formattedDate: todoItem.dueDate.toISOString().split('T')[0],
    },
    handlers: {
      handleDescriptionClick,
      handleDescriptionChange,
      handleBlur,
      handleKeyDown,
      handleToggle,
      handleDelete,
    }
  };
};