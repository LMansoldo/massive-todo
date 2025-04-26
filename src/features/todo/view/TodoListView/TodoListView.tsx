import React from 'react';
import styles from '@features/todo/view/TodoListView/TodoListView.module.css';
import Card from '@shared/lib/components/Card/Card';

interface TodoListViewProps {
  children: React.ReactNode;
}

const TodoListView: React.FC<TodoListViewProps> = ({ children }) => {
  return (
    <div className={styles.todoListContainer}>
      <header className={styles.header}>
        <h1>Todo List</h1>
      </header>

      <Card className={styles.mainContent}>
        {children} 
      </Card>
    </div>
  );
};

export default TodoListView;
