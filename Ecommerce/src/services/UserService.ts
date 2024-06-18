import axios from 'axios';
import { NewUser, User } from '../types/User';

const api = axios.create({
  baseURL: 'http://localhost:5000/users',
});

export const createUser = async (user: NewUser): Promise<User> => {
  const response = await api.post('/', user);
  return response.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<void> => {
  await api.put(`/${id}`, user);
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/');
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getUserByName = async (name: string): Promise<User> => {
  const response = await api.get(`/name/${name}`);
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await api.get(`/email/${email}`);
  return response.data;
};
