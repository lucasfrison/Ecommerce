import axios from 'axios';
import { NewAuth, Auth } from '../types/Auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/login',
});

export const login = async (user: NewAuth): Promise<Auth> => {
  const response = await api.post('/', user);
  return response.data;
};
