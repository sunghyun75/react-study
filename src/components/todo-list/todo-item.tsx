import { Button } from '../ui/button';
import { Link } from 'react-router';
import type { Todo } from '@/types';
import { useUpdateTodoMutation } from '@/hooks/mutations/use-update-todo.mutation';

export default function TodoItem({ id, content, isDone, index }: Todo) {
  const { mutate } = useUpdateTodoMutation();
  const handleCheckboxClick = () => {
    mutate({
      id,
      isDone: !isDone,
    });
  };
  const handleClickDelete = () => {};
  return (
    <div className="flex items-center justify-between border-2 p-2">
      <div className="flex gap-2">
        <div className="flex gap-5">
          <input
            onClick={handleCheckboxClick}
            type={'checkbox'}
            checked={isDone}
          />
          <span className="font-extrabold">{index + 1}.</span>
          <Link to={`/todolist/${id}`}> {content} </Link>
        </div>
      </div>
      <Button onClick={handleClickDelete} variant={'destructive'}>
        삭제
      </Button>
    </div>
  );
}
