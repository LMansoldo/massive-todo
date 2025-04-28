import { useCallback, useEffect, useMemo, useReducer } from "react";
import { TodoRepositoryFacade } from "@features/todo/model";
import { initialState, TodoContext, todoReducer } from "@features/todo/viewmodel/context/TodoContext";

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

  const commitChanges = useCallback(async () => {
    try {
      await repository.saveTodos(state.todos);
      dispatch({ type: 'COMMIT_CHANGES' });
    } catch (error) {
      console.error('Failed to commit changes:', error);
    }
  }, [repository, state.todos, dispatch]);

  const cancelChanges = useCallback(() => {
    dispatch({ type: 'CANCEL_CHANGES' });
  }, [dispatch]);

  const value = useMemo(() => ({
    state,
    dispatch,
    commitChanges,
    cancelChanges
  }), [state, dispatch, commitChanges, cancelChanges]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};