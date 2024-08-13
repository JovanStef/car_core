import axios from 'axios'
import { LocalStorageService } from './local-storage/localStorage.service';
import { LocalStorageKeyEnum } from '@/models/local-storage/localStorage.enum';
import { HomeRouteEnum, LoginRouteEnum } from '@/models/routes/routes.enum';
import { useRouter } from 'vue-router';
import router from '@/router';

const API_URL = 'http://localhost:3000';
const api = axios.create({
    baseURL: API_URL
  });

api.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.get(LocalStorageKeyEnum.Token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use( (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
},  (error) =>{
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // LocalStorageService.delete(LocalStorageKeyEnum.Token)
    router.push(LoginRouteEnum.Name)
    // return Promise.reject(error);
  });



export default api;