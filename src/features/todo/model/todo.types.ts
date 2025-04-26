import { ITodoEntity } from "@shared/models/todo";

export type ITodoItemData = ITodoEntity

export interface ITodoItemActions {
	onToggle: (id: string) => void;
	onUpdateDescription: (id: string, description: string) => void;
	onDelete: (id: string) => void;
}

export interface ITodoContextType {
  state: ITodoState;
  dispatch: React.Dispatch<TTodoAction>;
  commitChanges: () => Promise<void>;
  cancelChanges: () => void;
}

export interface ITodoState {
  todos: Array<ITodoItemData & { id: string }>;
  pendingChanges: Set<string>;
  snapshot: {
    todos: Array<ITodoItemData & { id: string }>;
    pendingChanges: Set<string>;
  } | null;
}

export type TTodoAction =
  | { type: 'ADD_TODO'; payload: { description: string; dueDate: Date } }
  | { type: 'UPDATE_TODO'; payload: { id: string; description?: string; dueDate?: Date } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'COMMIT_CHANGES' }
  | { type: 'CANCEL_CHANGES' }
  | { type: 'LOAD_TODOS'; payload: Array<ITodoItemData & { id: string }> };

