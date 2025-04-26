import React from 'react';
import { useTodoListContext } from '@features/todo/context/TodoListContext/TodoListContext';
import TodoItemContainer from '@features/todo/view/TodoItems/TodoItem/TodoItemContainer';
import { Table } from '@shared/lib/components/Table/Table';

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
          state.todos.map((todo: any, key: number) => (
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

export default TodoItems;