export interface ITodoEntity {
	id: string;
	description: string;
	dueDate: Date;
	completed: boolean;
}

export interface TodoRepository {
  saveTodos(todos: Array<ITodoEntity>): Promise<void>;
  loadTodos(): Promise<Array<ITodoEntity> | null>;
}