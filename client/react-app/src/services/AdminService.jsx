import axios from 'axios';
import {authHeader} from './AuthService'

const api = axios.create({
  baseURL: 'http://localhost:8080/admin', 
});


export const getFirst = () => {
  return api.get("",  { headers: authHeader() });
};