import { useEffect, useReducer } from "react";
import { TodoRepositoryFacade } from "@entities/todo/repo/TodoRepository";
import { initialState, TodoContext, todoReducer } from "@features/todo/context/TodoContext";


export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const repository = new TodoRepositoryFacade();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await repository.loadTodos();
        if (data) {
          dispatch({ type: 'LOAD_TODOS', payload: data });
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    loadTodos();
  }, []);

  const commitChanges = async () => {
    try {
      await repository.saveTodos(state.todos);
      dispatch({ type: 'COMMIT_CHANGES' });
    } catch (error) {
      console.error('Failed to commit changes:', error);
    }
  };

  const cancelChanges = () => {
    dispatch({ type: 'CANCEL_CHANGES' });
  };

  return (
    <TodoContext.Provider value={{ state, dispatch, commitChanges, cancelChanges }}>
      {children}
    </TodoContext.Provider>
  );
};