import axios from 'axios';

const devUrl = 'http://localhost:8080/practice/v1';
const prodUrl = 'http://practice.coceducation.com/api/practice/v1';

export const api = axios.create({
  baseURL: devUrl,
  withCredentials: true,
});

export const apiRestricted = axios.create({
  baseURL: devUrl,
  withCredentials: true
});