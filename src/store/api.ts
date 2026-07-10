import axios from 'axios';

const devUrl = 'http://localhost:8080/practice/v1';
// const prodUrl = 'https://cfmpractice.coceducation.com/api/practice/v1';
const prodUrl = 'https://cfmpracticeapi.coceducation.com/practice/v1';

// Helper function to get access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Request interceptor to add Authorization header
const addAuthHeader = (config: any) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const api = axios.create({
  baseURL: prodUrl,
  withCredentials: true,
});

export const apiRestricted = axios.create({
  baseURL: prodUrl,
  withCredentials: true
});

// Add request interceptors to include Authorization header
api.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));
apiRestricted.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));

// Response interceptors to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('API returned 401, clearing auth data');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth');
      localStorage.removeItem('gstAuth');
    }
    return Promise.reject(error);
  }
);

apiRestricted.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('API returned 401, clearing auth data');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth');
      localStorage.removeItem('gstAuth');
    }
    return Promise.reject(error);
  }
);