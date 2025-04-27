import React from 'react';
import styles from '@features/todo/view/TodoList.module.css';
import { useTodoListContext } from '@features/todo/context/TodoListContext/TodoListContext';
import Button from '@shared/lib/components/Button/Button';
import { EButtonVariant } from '@shared/enums/button.enum';

const TodoListPendingChanges = React.memo(() => {
  const { state, actions } = useTodoListContext();
  const count = state.pendingChangesCount;

  return (
    <div className={styles.pendingChanges}>
      <span className={styles.pendingCount}>
        {count} {count === 1 ? 'item' : 'itens'} waiting to be saved
      </span>

      <div className={styles.actions}>
        <Button
          onClick={actions.handleCommitChanges}
          variant={EButtonVariant.SUCCESS}
          disabled={count === 0}
        >
          Commit
        </Button>
        <Button
          onClick={actions.handleCancelChanges}
          variant={EButtonVariant.DANGER}
          disabled={count === 0}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default TodoListPendingChanges;