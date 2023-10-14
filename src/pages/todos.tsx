import { HeadFC } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Layout from '../theme/Layout';
import { ViewTodoDto } from '../models/ViewTodoDto';

const todos = () => {
  const [todos, setTodos] = useState<ViewTodoDto[]>([]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.Title}>
            <h2>{todo.Title}</h2>
            <p>{todo.Description}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default todos;

export const Head: HeadFC = () => <title>Todos</title>;
