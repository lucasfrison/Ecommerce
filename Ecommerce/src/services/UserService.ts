import axios from 'axios';
import { NewUser } from '../types/Auth';


const api = axios.create({
  baseURL: 'http://localhost:5000/users',
});


export const createUser = async (user: NewUser) => {
  const response = await api.post('/', user);
  return response.data;
};

export const updateUser = async (id: string, user: NewUser) => {
  const response = await api.put(`/${id}`, user);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getUserByName = async (name: string) => {
  const response = await api.get(`/${name}`);
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await api.get(`/${email}`);
  return response.data;
};