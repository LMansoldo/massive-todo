import { useCallback, useState } from 'react';
import { useTodoContext } from '@features/todo/context/TodoContext';
import { ITodoListViewModel } from '@features/todo/model/types/todo.types';

export const useTodoList = (): ITodoListViewModel => {
  const { state, dispatch, commitChanges, cancelChanges } = useTodoContext();
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const handleAddTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedDescription = newTodoDescription.trim();
    if (trimmedDescription === '') return;

    dispatch({
      type: 'ADD_TODO',
      payload: {
        description: trimmedDescription,
        dueDate: new Date()
      }
    });
    setNewTodoDescription('');
  }, [newTodoDescription, dispatch]);

  const handleToggleTodo = useCallback((id: string) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id }
    });
  }, [dispatch]);

  const handleUpdateTodoDescription = useCallback((id: string, description: string) => {
    if (!id || description.trim() === '') {
      return;
    }
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, description: description.trim() }
    });
  }, [dispatch]);

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id }
    });
  }, [dispatch]);

  const handleCommitChanges = async () => {
    try {
      await commitChanges();
    } catch (error) {
      console.error('Failed to commit changes:', error);
    }
  };

  const handleCancelChanges = () => {
    cancelChanges();
  };

  const handleNewTodoDescriptionChange = useCallback((value: string) => {
    setNewTodoDescription(value);
  }, []);


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