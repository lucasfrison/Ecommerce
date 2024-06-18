import axios from 'axios';
import { Orders } from '../types/Orders';

const api = axios.create({
  baseURL: 'http://localhost:5000/orders',
});

export const getAllOrders = async (): Promise<Orders[]> => {
  const response = await api.get('/');
  return response.data;
};
