import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ITodoContextType, ITodoState, TTodoAction } from '@features/todo/model/todo.types';

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
      
      const pendingChanges = new Set(state.pendingChanges);
      pendingChanges.add(id);

      return {
        todos: [...state.todos, newTodo],
        pendingChanges
      };
    }

    case 'UPDATE_TODO': {
      const { id, ...updates } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      
      if (todoIndex === -1) {
        return state;
      }
      
      const updatedTodos = [...state.todos];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        ...updates
      };
      
      const pendingChanges = new Set(state.pendingChanges);
      pendingChanges.add(id);

      return {
        todos: updatedTodos,
        pendingChanges
      };
    }

    case 'TOGGLE_TODO': {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      
      if (todoIndex === -1) {
        return state;
      }
      
      const updatedTodos = [...state.todos];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        completed: !updatedTodos[todoIndex].completed
      };
      
      const pendingChanges = new Set(state.pendingChanges);
      pendingChanges.add(id);

      return {
        todos: updatedTodos,
        pendingChanges
      };
    }

    case 'DELETE_TODO': {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      
      if (todoIndex === -1) {
        return state;
      }
      
      const updatedTodos = state.todos.filter(todo => todo.id !== id);
      
      const pendingChanges = new Set(state.pendingChanges);
      pendingChanges.add(id);

      return {
        todos: updatedTodos,
        pendingChanges
      };
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

  useEffect(() => {
    const loadTodos = async () => {
			// Add the repo here
    };

    loadTodos();
  }, []);

  const commitChanges = async () => {
		// Add the repo here
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