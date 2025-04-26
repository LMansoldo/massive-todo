import { useState } from 'react';
import { useTodoContext } from '@features/todo/context/TodoContext';

export const useTodoList: any = () => {
  const { state, dispatch, commitChanges, cancelChanges } = useTodoContext();
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoDescription.trim() !== '') {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          description: newTodoDescription.trim(),
          dueDate: new Date()
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


  return {
    state: {
      todos: state.todos,
      newTodoDescription,
      pendingChangesCount: state.pendingChanges.size,
    },
    actions: {
      handleAddTodo,
      handleToggleTodo,
      handleUpdateTodoDescription,
      handleDeleteTodo,
      handleCommitChanges,
      handleCancelChanges,
      handleNewTodoDescriptionChange
    }
  };
};