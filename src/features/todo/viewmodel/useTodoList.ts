import { useState } from 'react';
import { useTodoContext } from '@features/todo/context/TodoContext';

export const useTodoList: any = () => {
  const { state, dispatch, commitChanges, cancelChanges } = useTodoContext();
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<Date>(new Date());

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoDescription.trim() !== '') {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          description: newTodoDescription.trim(),
          dueDate: newTodoDueDate
        }
      });
      setNewTodoDescription('');
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id }
    });
  };

  const handleUpdateTodoDescription = (id: string, description: string) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, description }
    });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id }
    });
  };

  const handleCommitChanges = async () => {
    await commitChanges();
  };

  const handleCancelChanges = () => {
    cancelChanges();
  };

  const handleNewTodoDescriptionChange = (value: string) => {
    setNewTodoDescription(value);
  };

  const handleNewTodoDateChange = (value: Date) => {
    setNewTodoDueDate(value);
  };


  return {
    state: {
      todos: state.todos,
      newTodoDescription,
      newTodoDueDate,
      pendingChangesCount: state.pendingChanges.size,
    },
    actions: {
      handleAddTodo,
      handleToggleTodo,
      handleUpdateTodoDescription,
      handleDeleteTodo,
      handleCommitChanges,
      handleCancelChanges,
      handleNewTodoDescriptionChange,
      handleNewTodoDateChange,
    }
  };
};