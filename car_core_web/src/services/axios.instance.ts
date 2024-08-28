import axios from 'axios';
import { LocalStorageService } from './local-storage/localStorage.service';
import { LocalStorageKeyEnum } from '@/models/local-storage/localStorage.enum';
import { LoginRouteEnum } from '@/models/routes/routes.enum';
import router from '@/router';
import { AlertsUiService } from './ui/alerts.ui.service';

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
    const {data} = error.response
    const {statusCode , message} = data
    if(statusCode === 400){
      AlertsUiService.addToast({severity: 'error', summary: 'Error', detail: message}).showToast()
      throw error
  }
  // TODO global message
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(statusCode === 401){

      LocalStorageService.clear()
      router.push(LoginRouteEnum.Name)
    }
    // return Promise.reject(error);
  });



export default api;