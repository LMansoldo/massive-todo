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
          label="Nova Tarefa"
          id="newTodoDescription"
          type="text"
          placeholder="Nova tarefa"
          value={state.newTodoDescription}
          className="col-10"
          onChange={(e) => actions.handleNewTodoDescriptionChange(e.target.value)}
        />
        <TextField
          label="Data de Vencimento"
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