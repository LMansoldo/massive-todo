import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ITodoContextType, ITodoState, TTodoAction } from '@features/todo/model/todo.types';
import { TodoRepositoryFacade } from '@entities/todo/repo/TodoRepository';

const addPendingChange = (pendingChanges: Set<string>, id: string) => {
  const newSet = new Set(pendingChanges);
  newSet.add(id);
  return newSet;
};

function todoReducer(state: ITodoState, action: TTodoAction): ITodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const id = Date.now().toString();
      const newTodo = {
        id,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        completed: false
      };

      return {
        todos: [...state.todos, newTodo],
        pendingChanges: addPendingChange(state.pendingChanges, id)
      };
    }

    case 'UPDATE_TODO': {
      const { id, ...updates } = action.payload;
      const idx = state.todos.findIndex(todo => todo.id === id);

      if (idx === -1) return state;

      const todos = [...state.todos];

      todos[idx] = { ...todos[idx], ...updates };

      return { todos, pendingChanges: addPendingChange(state.pendingChanges, id) };
    }

    case 'TOGGLE_TODO': {
      const { id } = action.payload;
      const idx = state.todos.findIndex(todo => todo.id === id);

      if (idx === -1) return state;

      const todos = [...state.todos];

      todos[idx] = { ...todos[idx], completed: !todos[idx].completed };

      return { todos, pendingChanges: addPendingChange(state.pendingChanges, id) };
    }

    case 'DELETE_TODO': {
      const { id } = action.payload;
      const todos = state.todos.filter(todo => todo.id !== id);

      return { todos, pendingChanges: addPendingChange(state.pendingChanges, id) };
    }


    case 'COMMIT_CHANGES':
      return {
        ...state,
        pendingChanges: new Set<string>()
      };

    case 'CANCEL_CHANGES':
      return {
        ...state,
        pendingChanges: new Set<string>()
      };

    case 'LOAD_TODOS': {
      return {
        todos: action.payload,
        pendingChanges: new Set<string>()
      };
    }

    default:
      return state;
  }
}

const initialState: ITodoState = {
  todos: [],
  pendingChanges: new Set<string>()
};

const TodoContext = createContext<ITodoContextType | undefined>(undefined);

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

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};