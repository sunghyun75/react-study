import TodoEditor from '@/components/todo-list/todo-editor';
import TodoItem from '@/components/todo-list/todo-item';
import { useTodo } from '@/store/todos';

export default function TodoListPage() {
  const Todo = useTodo();

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {Todo.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
