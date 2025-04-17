import axios from 'axios';
import { store } from './index.ts';
import { openLoginPopup } from './slices/PopupSlice.ts';
import { logout } from './slices/AuthSlice.ts';

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