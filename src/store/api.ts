import axios from 'axios';
import { store } from './index.ts';

export const api = axios.create({
  baseURL: 'http://practice.coceducation.com/api/practice/v1',
  withCredentials: true,
});

export const apiRestricted = axios.create({
  baseURL: 'http://practice.coceducation.com/api/practice/v1',
  withCredentials: true
});

apiRestricted.interceptors.request.use((config) => {
  const token: any = store.getState().auth.token; 
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});