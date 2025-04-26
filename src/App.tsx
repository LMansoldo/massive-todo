import { TodoProvider } from '@features/todo/context/TodoContext/Provider';
import TodoListContainer from '@features/todo/view/TodoListContainer';
function App() {
  return (
    <div className="container">
      <TodoProvider>
        <div className="app">
          <TodoListContainer />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;