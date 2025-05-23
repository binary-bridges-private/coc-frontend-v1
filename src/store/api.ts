import axios from 'axios';

const devUrl = 'http://localhost:8080/practice/v1';
const prodUrl = 'http://cfmpractice.coceducation.com/api/practice/v1';

export const api = axios.create({
  baseURL: prodUrl,
  withCredentials: true,
});

export const apiRestricted = axios.create({
  baseURL: prodUrl,
  withCredentials: true
});