import { ITodoEntity, TodoRepository } from "@shared/models/todo";
import { TodoRepositoryFactory } from "@features/todo/model/factory/todoRepositoryFactory";

export class TodoRepositoryFacade {
  private repository: TodoRepository;
  
  constructor(repository?: TodoRepository) {
    this.repository = repository || TodoRepositoryFactory.createFromConfig();
  }
  
  async saveTodos(todos: Array<ITodoEntity>): Promise<void> {
    try {
      return await this.repository.saveTodos(todos);
    } catch (error) {
      console.error('Failed to save todos:', error);
      throw error;
    }
  }
  
  async loadTodos(): Promise<Array<ITodoEntity> | null> {
    try {
      return await this.repository.loadTodos();
    } catch (error) {
      console.error('Failed to load todos:', error);
      throw error;
    }
  }
}

let facadeInstance: TodoRepositoryFacade | null = null;

export const getTodoRepository = (): TodoRepositoryFacade => {
  if (!facadeInstance) {
    facadeInstance = new TodoRepositoryFacade();
  }
  return facadeInstance;
};