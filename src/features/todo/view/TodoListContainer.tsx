import React from 'react';
import { TodoListProvider } from '@features/todo/viewmodel/providers/TodoListProvider';
import { TodoProvider } from '@features/todo/viewmodel/providers/TodoProvider';
import TodoListView from './TodoListView/TodoListView';
import TodoListPendingChanges from './TodoListPendingChanges/TodoListPendingChanges';
import TodoAddForm from './TodoAddForm/TodoAddForm';
import TodoItems from './TodoItems/TodoItems';

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

export default TodoListContainer;