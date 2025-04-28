import { useTodoList } from "../hooks/useTodoList";
import { TodoListContext } from "../context/TodoListContext/TodoListContext";

export const TodoListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const ctx = useTodoList();
	return <TodoListContext.Provider value={ctx}>{children}</TodoListContext.Provider>;
};
