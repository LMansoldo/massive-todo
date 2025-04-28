import React from 'react';
import { useTodoItem } from '@features/todo/viewmodel/hooks/useTodoItem';
import TodoItemView from '@features/todo/view/TodoItems/TodoItem/TodoItemView';
import { useTodoListContext } from '@features/todo/viewmodel/context/TodoListContext/TodoListContext';

interface Props {
  id: string;
  even: boolean;
  description: string;
  dueDate: Date;
  completed: boolean;
}

const TodoItemContainer: React.FC<Props> = ({ id, even, description, dueDate, completed }) => {
  const { actions } = useTodoListContext();

  const { state, handlers } = useTodoItem(
    { id, description, dueDate, completed },
    {
      onToggle: actions.handleToggleTodo,
      onUpdateDescription: actions.handleUpdateTodoDescription,
      onDelete: actions.handleDeleteTodo,
    }
  );

  return (
    <TodoItemView
      even={even}
      completed={completed}
      isEditing={state.isEditing}
      description={description}
      editedDescription={state.editedDescription}
      formattedDate={state.formattedDate}
      onToggle={handlers.handleToggle}
      onDescriptionClick={handlers.handleDescriptionClick}
      onDescriptionChange={handlers.handleDescriptionChange}
      onBlur={handlers.handleBlur}
      onKeyDown={handlers.handleKeyDown}
      onDelete={handlers.handleDelete}
    />
  );
};

export default TodoItemContainer;