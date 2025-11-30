import { updateTodo } from '@/api/update-todo';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoMutation() {
  const queryCilent = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryCilent.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
      const prevTodos = queryCilent.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      queryCilent.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodos) =>
          prevTodos.id === updatedTodo.id
            ? { ...prevTodos, ...updatedTodo }
            : prevTodos,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryCilent.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      queryCilent.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
