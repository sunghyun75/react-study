import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { combine } from 'zustand/middleware';
import type { Todo } from '@/types';

const InitialState: { todos: Todo[] } = {
  todos: [],
};

const useTodoStore = create(
  immer(
    combine(InitialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: String(new Date().getTime()),
              content: content,
            });
          });
        },
        deleteTodo: (id: string) => {
          set((state) => {
            state.todos = state.todos.filter((todos) => todos.id !== id);
          });
        },
      },
    })),
  ),
);

export const useTodo = () => {
  const todo = useTodoStore((store) => store.todos);
  return todo;
};

export const useCreateTodo = () => {
  const createTodo = useTodoStore((store) => store.actions.createTodo);
  return createTodo;
};

export const useDeleteTodo = () => {
  const deleteTodo = useTodoStore((store) => store.actions.deleteTodo);
  return deleteTodo;
};
