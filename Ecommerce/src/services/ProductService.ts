import axios from 'axios';
import { NewProduct } from '../types/Product';

const api = axios.create({
  baseURL: 'http://localhost:5000/products',
});

export const getAllProducts = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createProduct = async (product: NewProduct) => {
  const response = await api.post('/', product);
  return response.data;
};

export const updateProduct = async (id: string, product: NewProduct) => {
  const response = await api.put(`/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
