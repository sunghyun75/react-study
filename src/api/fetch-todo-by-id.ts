import { API_URL } from '@/lib/constants';
import type { Todo } from '@/types';

export async function FetchTodoByid(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`);
  if (!response.ok) throw new Error('fecth failed');

  const data: Todo = await response.json();
  return data;
}
