import axios from 'axios';

export const API = {
  baseUrl: import.meta.env.VITE_BACKEND_URL,
};

const axiosService = axios.create({
  baseURL: API.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem('token');
    config.headers = {...config.headers, Authorization: `Bearer ${token}`};

    return config;
  },
  error => Promise.reject(error),
);

axiosService.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error || 'Wrong Services');
  },
);

export default axiosService;
