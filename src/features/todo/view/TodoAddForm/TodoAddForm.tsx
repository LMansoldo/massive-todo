import React from 'react';
import styles from '@features/todo/view/TodoList.module.css';
import { TextField } from '@shared/lib/components/TextField/TextField';
import { Button } from '@shared/lib/components/Button/Button';
import { useTodoListContext } from '@features/todo/context/TodoListContext';

const TodoAddForm: React.FC = () => {
  const { state, actions } = useTodoListContext();

  return (
    <form onSubmit={actions.handleAddTodo} className={styles.addForm}>
      <TextField
        label="Nova Tarefa"
        id="newTodoDescription"
        type="text"
        placeholder="Nova tarefa"
        value={state.newTodoDescription}
        onChange={(e) => actions.handleNewTodoDescriptionChange(e.target.value)}
        className="col-10"
      />
      <TextField
        label="Data de Vencimento"
        id='newTodoDueDate'
        type="date"
        value={state.newTodoDueDate.toISOString().split('T')[0]}
        onChange={(e) => actions.handleNewTodoDateChange(new Date(e.target.value))}
        className="col-10"
      />
      <Button type="submit" className="col-3">
        Adicionar
      </Button>
    </form>
  );
};

export default TodoAddForm;