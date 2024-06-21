import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const instance = () => {
 axios.defaults.baseURL = 'http://172.16.2.12:8000/api/v1';
 const api = axios.create({
  baseURL: 'http://172.16.2.12:8000/api/v1',
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

return{api}

};



 



