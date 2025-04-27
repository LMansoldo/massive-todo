import { ITodoState } from "@features/todo/model/types/todo.types";

export const addPendingChange = (pendingChanges: Set<string>, id: string) => {
	const newSet = new Set(pendingChanges);
	newSet.add(id);
	return newSet;
};

export const createSnapshotIfNeeded = (state: ITodoState): ITodoState['snapshot'] => {
	if (state.pendingChanges.size === 0) {
		return {
			todos: [...state.todos],
			pendingChanges: new Set<string>()
		};
	}
	
	return state.snapshot;
};