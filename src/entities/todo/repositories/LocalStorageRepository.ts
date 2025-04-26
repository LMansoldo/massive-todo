import { ITodoItemData } from '@features/todo/model/todo.types';
import { getDBConfig } from '@entities/todo/config/DB.config';
import { ITodoEntity } from '@shared/models/todo';

export class LocalStorageRepository {
  async saveTodos(todos: Array<ITodoItemData>): Promise<void> {
    const config = getDBConfig().localStorageConfig;
    if (!config) {
      throw new Error('Local storage configuration not found');
    }

    const data = {
      todos,
      lastUpdated: new Date().toISOString()
    };

    try {
      localStorage.setItem(config.key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
      throw error;
    }
  }

  async loadTodos(): Promise<Array<ITodoItemData> | null> {
    const config = getDBConfig().localStorageConfig;
    if (!config) {
      throw new Error('Local storage configuration not found');
    }

    const data = localStorage.getItem(config.key);

    if (!data) {
      return null;
    }

    try {
      const parsedData = JSON.parse(data);
      
      const todos = parsedData.todos.map((todo: ITodoEntity) => ({
        ...todo,
        dueDate: typeof todo.dueDate === 'string' ? new Date(todo.dueDate) : todo.dueDate
      }));
      
      return todos;
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error);
      return null;
    }
  }
}
