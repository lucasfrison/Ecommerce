import axios from 'axios';
import { NewUser } from '../types/Auth';


const api = axios.create({
  baseURL: 'http://localhost:5000/login',
});


export const login = async (user: NewUser) => {
  const response = await api.post('/', user);
  return response.data;
};
