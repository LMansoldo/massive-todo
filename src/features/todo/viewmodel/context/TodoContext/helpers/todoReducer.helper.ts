import { ITodoState, TTodoAction } from "@features/todo/model/types/todo.types";
import { addPendingChange, createSnapshotIfNeeded } from "@features/todo/viewmodel/context/TodoContext/helpers/todoContext.helper";

export function todoReducer(state: ITodoState, action: TTodoAction): ITodoState {
	switch (action.type) {
		case 'ADD_TODO': {
			const snapshot = createSnapshotIfNeeded(state);
			
			const id = Date.now().toString();
			const newTodo = {
				id,
				description: action.payload.description,
				dueDate: action.payload.dueDate,
				completed: false
			};

			return {
				todos: [...state.todos, newTodo],
				pendingChanges: addPendingChange(state.pendingChanges, id),
				snapshot
			};
		}

		case 'UPDATE_TODO': {
			const snapshot = createSnapshotIfNeeded(state);
			
			const { id, ...updates } = action.payload;
			const idx = state.todos.findIndex((todo: { id: string; }) => todo.id === id);

			if (idx === -1) return state;

			const todos = [...state.todos];
			todos[idx] = { ...todos[idx], ...updates };

			return { 
				todos, 
				pendingChanges: addPendingChange(state.pendingChanges, id),
				snapshot
			};
		}

		case 'TOGGLE_TODO': {
			const snapshot = createSnapshotIfNeeded(state);
			
			const { id } = action.payload;
			const idx = state.todos.findIndex((todo: { id: string; }) => todo.id === id);

			if (idx === -1) return state;

			const todos = [...state.todos];
			todos[idx] = { ...todos[idx], completed: !todos[idx].completed };

			return { 
				todos, 
				pendingChanges: addPendingChange(state.pendingChanges, id),
				snapshot
			};
		}

		case 'DELETE_TODO': {
			const snapshot = createSnapshotIfNeeded(state);
			
			const { id } = action.payload;
			const todos = state.todos.filter((todo: { id: string; }) => todo.id !== id);

			return { 
				todos, 
				pendingChanges: addPendingChange(state.pendingChanges, id),
				snapshot
			};
		}

		case 'COMMIT_CHANGES':
			return {
				...state,
				pendingChanges: new Set<string>(),
				snapshot: null 
			};

		case 'CANCEL_CHANGES': {
			if (!state.snapshot) {
				return {
					...state,
					pendingChanges: new Set<string>()
				};
			}
			
			return {
				todos: [...state.snapshot.todos],
				pendingChanges: new Set<string>(),
				snapshot: null 
			};
		}

		case 'LOAD_TODOS': {
			return {
				todos: action.payload,
				pendingChanges: new Set<string>(),
				snapshot: null
			};
		}

		default:
			return state;
	}
}
