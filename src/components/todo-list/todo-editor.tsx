import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCreateTodoMutation } from '@/hooks/mutations/use-create-todo-mutation';

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [contents, setContents] = useState('');

  const handleClickAdd = () => {
    if (contents.trim() === '') return;
    mutate(contents);
    setContents('');
  };
  return (
    <div className="flex gap-2 p-5">
      <Input
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="일정을 추가하세요..."
      />
      <Button disabled={isPending} onClick={handleClickAdd}>
        추가
      </Button>
    </div>
  );
}
