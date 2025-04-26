import { getDBConfig } from "@entities/todo/config/DB.config";
import { TodoRepository } from "@shared/models/todo";
import { IndexedDBRepository } from "@entities/todo/repositories/IndexedDbRepository";
import { LocalStorageRepository } from "@entities/todo/repositories/LocalStorageRepository";

export class TodoRepositoryFactory {
  static createRepository(type?: string): TodoRepository {
    const storageType = type || getDBConfig().storageType;
    
    switch (storageType) {
      case 'localStorage':
        return new LocalStorageRepository();
      case 'indexedDB':
        return new IndexedDBRepository();
      default:
        return new LocalStorageRepository();
    }
  }
  
  static createFromConfig(): TodoRepository {
    return this.createRepository(getDBConfig().storageType);
  }
}