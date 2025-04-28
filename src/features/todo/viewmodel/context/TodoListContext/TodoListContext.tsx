import { createContext, useContext } from 'react';
import { useTodoList } from '@features/todo/viewmodel/hooks/useTodoList';

const TodoListContext = createContext<ReturnType<typeof useTodoList> | null>(null);

const useTodoListContext = () => {
  const ctx = useContext(TodoListContext);
  if (!ctx) throw new Error('useTodoListContext must be used within a TodoListProvider');
  return ctx;
};

export { TodoListContext, useTodoListContext };