import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Todo } from '@/types';

const InitialState: {
  todos: Todo[];
} = {
  todos: [],
};

const useTodosStore = create(
  immer(
    combine(InitialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content: content,
            });
          });
        },
        deleteTodo: (targetId: number) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    })),
  ),
);

export const useTodo = () => {
  const todos = useTodosStore((store) => store.todos);
  return todos;
};

export const useCreate = () => {
  const createTodo = useTodosStore((store) => store.actions.createTodo);
  return createTodo;
};

export const useDelete = () => {
  const deleteTodo = useTodosStore((store) => store.actions.deleteTodo);
  return deleteTodo;
};
