import axios from 'axios';
import {authHeader} from './AuthService'

const api = axios.create({
  baseURL: 'http://localhost:8080/users', 
});

export const getUsers = () => api.get("", { headers: authHeader()});
export const getUserById = (userId) => api.get(`/${userId}`, { headers: authHeader()});
export const addUser = (userData) => api.post("", userData, { headers: authHeader()});
export const deleteUser = (userId) => api.delete(`/${userId}`, { headers: authHeader()});
export const updateUser = (userId, userData) => api.put(`/${userId}`, userData, { headers: authHeader()});