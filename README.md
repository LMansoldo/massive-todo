# Massive Todo App Documentation

[Demo](https://lmansoldo.github.io/massive-todo/)

## Overview

A Todo List application built with React and TypeScript. The app supports offline-first functionality with multiple storage strategies.

### Table of Contents

1. [Architecture](#Architecture)
   1. [Requirements](#Requirements)
   2. [Implementation Overview](#Implementation-Overview)
   3. [Project Structure](#Project-Structure)
2. [Design Patterns and Architectural Decisions](#Design-Patterns-and-Architectural-Decisions)
3. [Getting Started](#Getting-Started)

## Screenshots

![TODO List Home Screen](src/assets/todo.png 'TODO List')

## Architecture

#### Requirements

1. CRUD to add, update, delete and read todo items.
2. Offline-first functionality in LocalStorage and IndexedDB.
3. Ability to switch between storage strategies.
4. Batch updates, awaiting for a confirmattion before committing changes, stored temporarily.
5. Batch actions to commit changes or discard them, undoing temporary changes.

#### Implementation Overview

Given the project requirements, the chosen solution was to utilize a Context-based structure to temporarily manage the task list before persisting it.
A dedicated Context was created to globally manage application states, such as task list display, item creation, updates, and deletions, ensuring a decoupled architecture across UI components.
Separately, a second Context was implemented to handle local storage operations, responsible for persisting and retrieving data independently of the UI logic.

To support flexible storage strategies, a database configuration feature was introduced, allowing an easy switching between different storage mechanisms without impacting the core application code or the UI.

For the Commit and Cancel functionalities, a list memoization strategy was adopted. This approach ensures that previous states are preserved, enabling users to discard changes without directly modifying the stored data.

In pursuit of scalability, simplicity, clear separation of concerns, efficient state management, and improved testability, the **MVVM (Model-View-ViewModel)** architectural pattern was selected as the foundation for the application’s structure.

![TODO List App Layer Diagram](<src/assets/Layer%20Diagram%20-%20TODO.drawio%20(1).png> 'TODO List App Layer Diagram')

#### Project Structure

```
src/
├── features/           # Feature modules
│   └── todo/
│       ├── model/      # Domain types
│       │   ├── config/ 	     # Database configuration
│       │   ├── factory/ 	     # Repository factory
│       │   ├── repositories/    # Repository interface
│       │   └── types/ 		     # App model types
│       ├── view/       # UI components
│       └── viewmodel/  # Business logic
│           ├── context/ 	     # App Contexts
│           ├── hooks/           # App Custom hooks
│           └── providers/       # Context Providers
│
├── shared/             # Shared resources
│   ├── enums/        # Common enums
│   ├── lib/          # Common UI components
│   ├── types/        # Common model types
│   └── models/       # Shared models
```

## Design Patterns and Architectural Decisions

Given the presented scenario, I decided to implement several design patterns to maintain the simplicity of components and their supporting structures, facilitate their usage within the view layer, and avoid code duplication.

The Repository Pattern was adopted to handle data loading and persistence operations with LocalStorage and IndexedDB, contributing to the isolation of the model layer and standardizing service methods.

```ts
export class LocalStorageRepository {
	async saveTodos(todos: Array<ITodoItemData>): Promise<void> {
		// logic to save a TODO List
	}

	async loadTodos(): Promise<Array<ITodoItemData> | null> {
		// logic to load a TODO List
	}
}
```

Each type of storage has its own repository, allowing them to be used interchangeably as needed. To load database configurations and select which repository to use (without altering the core CRUD logic) I applied a combination of the Facade Pattern and the Factory Pattern.

The repository’s Factory receives database configuration settings from the `DB.config.ts` file and dynamically loads the appropriate storage type. This enables Context files to perform repository operations without needing to know which storage mechanism is being used behind the scenes.

```ts
export class TodoRepositoryFactory {
	static createRepository(type?: string): TodoRepository {
		const storageType = type || getDBConfig().storageType

		switch (storageType) {
			case 'localStorage':
				return new LocalStorageRepository()
			case 'indexedDB':
				return new IndexedDBRepository()
			default:
				return new LocalStorageRepository()
		}
	}

	static createFromConfig(): TodoRepository {
		return this.createRepository(getDBConfig().storageType)
	}
}
```

The call is made to our Facade, which serves as a simplified interface to the repositories.
This approach ensures that the entire model layer remains decoupled and scalable.
For example, if we want to perform operations through an API endpoint, we simply need to create a new repository, register it within our Factory and use it seamlessly without modifying the existing logic.

```ts
export class TodoRepositoryFacade {
	private repository: TodoRepository

	constructor(repository?: TodoRepository) {
		this.repository = repository || TodoRepositoryFactory.createFromConfig()
	}

	async saveTodos(todos: Array<ITodoEntity>): Promise<void> {
		try {
			return await this.repository.saveTodos(todos)
		} catch (error) {
			console.error('Failed to save todos:', error)
			throw error
		}
	}

	async loadTodos(): Promise<Array<ITodoEntity> | null> {
		try {
			return await this.repository.loadTodos()
		} catch (error) {
			console.error('Failed to load todos:', error)
			throw error
		}
	}
}
```

To separate the presentation of task list data from the underlying logic (ViewModel layer), I adopted the Container/Presentational Pattern.
I utilized Context API along with Hooks to interact with the Facade and manage the data locally within the application.

```ts
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const repository = new TodoRepositoryFacade();

	// TODO Logic

  const value = useMemo(() => ({
    state,
    dispatch,
    commitChanges,
    cancelChanges
  }), [state, dispatch, commitChanges, cancelChanges]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
```

In the View layer, only Container components are responsible for calling Hooks or using their respective Providers.

```ts
const TodoListContainer: React.FC = () => {
  return (
    <TodoProvider>
      <TodoListProvider>
        <TodoListView>
          <TodoAddForm />
          <TodoItems />
          <TodoListPendingChanges />
        </TodoListView>
      </TodoListProvider>
    </TodoProvider>
  );
};
```

For the task list visualization within the table component, the Compound Pattern was used, as the elements belong to the same component and are rendered together in a modular and cohesive manner.

```ts
const Table = ({
  children,
  striped = false,
  hoverable = false,
  className = ''
}: TableProps) => {
  return (
    <TableContext.Provider value={{ striped, hoverable }}>
      <div className={`${styles.tableContainer} ${className}`}>
        <table className={styles.table}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

const Head = () => (
    <thead>
      {children}
    </thead>
);


const Body  = () => (
    <tbody>
      {children}
    </tbody>
);


const Row = () => (
    <tr>
      {children}
    </tr>
);


const HeaderCell = () => (
    <th>
      {children}
    </th>
);


const Cell = () => (
    <td>
      {children}
    </td>
);


Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export { Table };
```

```ts
const TodoItems: React.FC = () => {
  const { state } = useTodoListContext();

  return (
    <Table striped hoverable>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell align="center">Due Date</Table.HeaderCell>
          <Table.HeaderCell align="center">Completed</Table.HeaderCell>
          <Table.HeaderCell align="center">Action</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
      {state.todos.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={4} align="center">
              No tasks found
            </Table.Cell>
          </Table.Row>
        ) : (
          state.todos.map((todo: ITodoItemData, key: number) => (
            <TodoItemContainer
              key={key}
              id={todo.id}
              even={key % 2 === 0}
              description={todo.description}
              dueDate={todo.dueDate}
              completed={todo.completed}
            />
          ))
        )}
      </Table.Body>
    </Table>
  );
};
```

## Getting Started

```
# Clone repository
git clone https://github.com/LMansoldo/massive-todo.git

# Install dependencies
cd massive-todo
npm install

# Start development server
npm run dev
```

To change the storage type, modify this object in the file `src/features/todo/model/config/DB.config.ts`

```ts
export enum EStorageType {
	LocalStorage = 'localStorage',
	IndexedDB = 'indexedDB',
}

---

const defaultConfig: IDBConfig = {
	storageType: EStorageType.LocalStorage, // To change the default storage type
	localStorageConfig: {
		key: 'todo-app-data'
	},
	indexedDBConfig: {
		databaseName: 'todo-app-db',
		version: 1,
		storeName: 'todos'
	}
};

```

### Production build

```
npm run build
```

### Preview

```
npm run preview
```
