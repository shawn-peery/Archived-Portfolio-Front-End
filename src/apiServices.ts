import axios from 'axios';
import { CreateTodoDto } from './models/CreateTodoDto';
import { ReturnModelWithMessageDto } from './models/ReturnModelWithMessageDto';
import { ViewTodoDto } from './models/ViewTodoDto';

const root = 'https://localhost:7218/api/';

export const TodoService = {
  CreateTodo: root + 'todo/createtodo',
};

export const ProfileService = {
  GetProfileInfo: root + 'profile/profile',
};
