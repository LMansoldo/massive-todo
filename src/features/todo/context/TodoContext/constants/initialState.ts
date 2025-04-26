import { ITodoState } from "@features/todo/model/todo.types";

export const initialState: ITodoState = {
	todos: [],
	pendingChanges: new Set<string>(),
	snapshot: null
};
