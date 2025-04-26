import { createContext, useContext } from 'react';
import { useTodoList } from '@features/todo/viewmodel/useTodoList';

const TodoListContext = createContext<ReturnType<typeof useTodoList> | null>(null);

export const TodoListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctx = useTodoList();
  return <TodoListContext.Provider value={ctx}>{children}</TodoListContext.Provider>;
};

export const useTodoListContext = () => {
  const ctx = useContext(TodoListContext);
  if (!ctx) throw new Error('useTodoListContext must be used within a TodoListProvider');
  return ctx;
};
