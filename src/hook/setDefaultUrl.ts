import axios from 'axios';
const instance = () => {
  axios.defaults.baseURL = 'http://172.16.2.12:8000/api/v1';
};

export default instance;
