import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCreate } from '@/store/todos';

export default function TodoEditor() {
  const createTodo = useCreate();

  const [content, setContent] = useState('');

  const handlerClickAdd = () => {
    if (content.trim() === '') return;
    createTodo(content);
    setContent('');
  };
  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="일정을 추가하세요..."
      />
      <Button onClick={handlerClickAdd}>추가</Button>
    </div>
  );
}
