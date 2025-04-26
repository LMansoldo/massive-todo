import React from 'react';
import styles from '@features/todo/view/TodoList.module.css';
import { TextField } from '@shared/lib/components/TextField/TextField';
import { Button } from '@shared/lib/components/Button/Button';
import { useTodoListContext } from '@features/todo/context/TodoListContext';

const TodoAddForm: React.FC = () => {
  const { state, actions } = useTodoListContext();

  return (
    <form onSubmit={actions.handleAddTodo} className={styles.addForm}>
      <div className={`${styles.inputContainer}`}>
        <TextField
          label="New Task"
          id="newTodoDescription"
          type="text"
          placeholder="Insert the description"
          value={state.newTodoDescription}
          className="col-10"
          onChange={(e) => actions.handleNewTodoDescriptionChange(e.target.value)}
        />
        <TextField
          label="Due Date"
          id='newTodoDueDate'
          type="date"
          value={state.newTodoDueDate.toISOString().split('T')[0]}
          className="col-10"
          onChange={(e) => actions.handleNewTodoDateChange(new Date(e.target.value))}
        />
      </div>
      <Button type="submit" >
        Add Task
      </Button>
    </form>
  );
};

export default TodoAddForm;