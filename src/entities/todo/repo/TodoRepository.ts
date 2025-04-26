import { ITodoItemData } from '@features/todo/model/todo.types';
import { getDBConfig } from '@shared/config/DB.config';
import { LocalStorageRepository } from '@entities/todo/repo/LocalStorageRepo';
import { IndexedDBRepository } from '@entities/todo/repo/IndexedDbRepo';

interface TodoRepository {
  saveTodos(todos: Array<ITodoItemData>): Promise<void>;
  loadTodos(): Promise<Array<ITodoItemData> | null>;
}

export class TodoRepositoryFacade {
  private localStorageRepo: LocalStorageRepository;
  private indexedDBRepo: IndexedDBRepository;

  constructor() {
    this.localStorageRepo = new LocalStorageRepository();
    this.indexedDBRepo = new IndexedDBRepository();
  }

  private getRepository(): TodoRepository {
    const config = getDBConfig();
    
    switch (config.storageType) {
      case 'localStorage':
        return this.localStorageRepo;
      case 'indexedDB':
        return this.indexedDBRepo;
      default:
        return this.localStorageRepo;
    }
  }

  async saveTodos(todos: Array<ITodoItemData>): Promise<void> {
    const repo = this.getRepository();
    return repo.saveTodos(todos);
  }

  async loadTodos(): Promise<Array<ITodoItemData> | null> {
    const repo = this.getRepository();
    return repo.loadTodos();
  }
}
