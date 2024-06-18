import axios from 'axios';
import { User } from '../types/User';
import { NewAuth } from '../types/Auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/login',
});

export const login = async (user: NewAuth): Promise<User> => {
  const response = await api.post('/', user);
  return response.data;
};
