import { ITodoItemData } from '@features/todo/model/types/todo.types';
import { getDBConfig } from '@features/todo/model/config/DB.config';
import { ITodoEntity } from '@shared/models/todo';

export class IndexedDBRepository {
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const config = getDBConfig().indexedDBConfig;
      if (!config) {
        return reject(new Error('IndexedDB configuration not found'));
      }

      const request = indexedDB.open(config.databaseName, config.version);

      request.onerror = () => reject(request.error);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(config.storeName)) {
          db.createObjectStore(config.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
    });
  }

  async saveTodos(todos: Array<ITodoItemData>): Promise<void> {
    try {
      const config = getDBConfig().indexedDBConfig;
      if (!config) {
        throw new Error('IndexedDB configuration not found');
      }

      const db = await this.openDatabase();
      const transaction = db.transaction([config.storeName], 'readwrite');
      const store = transaction.objectStore(config.storeName);

      const data = {
        todos,
        lastUpdated: new Date().toISOString()
      };

      return new Promise((resolve, reject) => {
        const request = store.put(data, 'todos');
        
        request.onerror = () => {
          reject(request.error);
          db.close();
        };
        
        transaction.oncomplete = () => {
          resolve();
          db.close();
        };
      });
    } catch (error) {
      console.error('Failed to save todos to IndexedDB:', error);
      throw error;
    }
  }

  async loadTodos(): Promise<Array<ITodoItemData> | null> {
    try {
      const config = getDBConfig().indexedDBConfig;
      if (!config) {
        throw new Error('IndexedDB configuration not found');
      }

      const db = await this.openDatabase();
      const transaction = db.transaction([config.storeName], 'readonly');
      const store = transaction.objectStore(config.storeName);

      return new Promise((resolve, reject) => {
        const request = store.get('todos');
        
        request.onerror = () => {
          reject(request.error);
          db.close();
        };
        
        request.onsuccess = () => {
          if (!request.result) {
            resolve(null);
          } else {
            const todos = request.result.todos.map((todo: ITodoEntity) => ({
              ...todo,
              dueDate: typeof todo.dueDate === 'string' ? new Date(todo.dueDate) : todo.dueDate
            }));
            
            resolve(todos);
          }
          db.close();
        };
      });
    } catch (error) {
      console.error('Failed to load todos from IndexedDB:', error);
      return null;
    }
  }
}
