import axios from 'axios';
import { User } from '../types/User';

const api = axios.create({
    baseURL: 'http://localhost:5000/users',
});

export const updateUser = async (id: string, user: User) => {
    const response = await api.put(`/${id}`, user);
    return response.data;
};

export const getUserById = async (id: string) => {
    const response = await api.get(`/${id}`);
    return response.data;
};
