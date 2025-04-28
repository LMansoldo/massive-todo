import { ITodoState } from "@features/todo/model/types/todo.types";

export const initialState: ITodoState = {
	todos: [],
	pendingChanges: new Set<string>(),
	snapshot: null
};
