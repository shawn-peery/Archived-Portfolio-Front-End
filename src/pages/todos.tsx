import { HeadFC } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Layout from '../theme/Layout';
import { ViewTodoDto } from '../models/ViewTodoDto';
import useRequestWithAccessToken from '../hooks/useRequestWithAccessToken';
import { TodoService } from '../apiServices';
import { ReturnModelWithMessageDto } from '../models/ReturnModelWithMessageDto';
import {
  isNotNullNorUndefined,
  isNotNullNorUndefinedNorEmptyString,
  isNullOrUndefined,
  isNullOrUndefinedOrEmptyString,
} from '../utils/IsNullOrUndefined';
import { CreateTodoDto } from '../models/CreateTodoDto';
import { title } from 'process';
import { callApiWithToken } from '../fetch';

const todos = () => {
  const [todos, setTodos] = useState<ViewTodoDto[]>([]);

  const [createNewTodoTitle, setCreateNewTodoTitle] = useState<string>('');
  const [createNewTodoDescription, setCreateNewTodoDescription] = useState<string>('');

  const [authResult, error, callApiMethod] = useRequestWithAccessToken<
    ReturnModelWithMessageDto<ViewTodoDto>
  >(TodoService.CreateTodo, 'POST');

  if (error !== undefined && error !== null) {
    console.error(`Error: ${error.message}`);
    return <div>Error: {error.message}</div>;
  }

  const handleCreateTodo = () => {
    if (isNullOrUndefinedOrEmptyString(createNewTodoTitle)) {
      alert('Please provide a title!');
    }

    if (isNullOrUndefinedOrEmptyString(createNewTodoDescription)) {
      alert('Please provide a description!');
    }

    const promise = callApiMethod({
      Title: createNewTodoTitle,
      Description: createNewTodoDescription,
    });

    if (isNullOrUndefined(promise)) {
      return;
    }

    promise
      .then((result) => {
        const { Message: message, Model: model } = result;

        if (isNotNullNorUndefinedNorEmptyString(message)) {
          console.log(`Todo Response Message: ${message}`);

          alert(`Todo Response Message: ${message}`);
        }

        setTodos((oldTodos) => [...oldTodos, model]);
      })
      .catch((e) => {
        console.error(`Error: ${e}`);
      });
  };

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
      <label style={{ display: 'block' }}>
        Title
        <input
          type="text"
          value={createNewTodoTitle}
          onChange={(e) => setCreateNewTodoTitle(e.target.value)}
        />
      </label>

      <label style={{ display: 'block' }}>
        Description
        <input
          type="text"
          value={createNewTodoDescription}
          onChange={(e) => {
            setCreateNewTodoDescription(e.target.value);
          }}
        />
      </label>
      <button onClick={() => handleCreateTodo()}>Create Todo</button>
    </Layout>
  );
};

export default todos;

export const Head: HeadFC = () => <title>Todos</title>;
