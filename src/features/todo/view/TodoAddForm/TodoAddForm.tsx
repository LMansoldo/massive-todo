import React from 'react';
import styles from '@features/todo/view/TodoList.module.css';
import { TextField } from '@shared/lib/components/TextField/TextField';
import { Button } from '@shared/lib/components/Button/Button';
import { useTodoListContext } from '@features/todo/viewmodel/context/TodoListContext/TodoListContext';

const TodoAddForm = React.memo(() => {
  const { state, actions } = useTodoListContext();

  return (
    <form onSubmit={actions.handleAddTodo} className={styles.addForm}>
        <TextField
          className="w-100 col-11"
          label="New Task"
          id="newTodoDescription"
          type="text"
          placeholder="Insert the description"
          value={state.newTodoDescription}
          onChange={(e) => actions.handleNewTodoDescriptionChange(e.target.value)}
        />
      <Button type="submit" className="col-2" disabled={state.newTodoDescription.trim() === ''}>
        Add Task
      </Button>
    </form>
  );
});

export default TodoAddForm;