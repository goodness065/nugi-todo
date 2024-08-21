import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoResponse } from './api.types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResponse, void>({
      query: () => '/todos',
    }),
    getTodo: builder.query({
      query: (id) => `/todos/${id}`,
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todosApi;
