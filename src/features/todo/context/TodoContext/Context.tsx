import { createContext, useContext } from 'react';
import { ITodoContextType } from '@features/todo/model/types/todo.types';

const TodoContext = createContext<ITodoContextType | undefined>(undefined);

const useTodoContext = () => {
	const context = useContext(TodoContext);
	if (context === undefined) {
		throw new Error('useTodoContext must be used within a TodoProvider');
	}
	return context;
};

export { TodoContext, useTodoContext };