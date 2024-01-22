import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// Set the base URL based on the environment
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_PROD_URL
    : process.env.REACT_APP_API_DEV_URL;

axios.interceptors.response.use(
  success => {
    return Promise.resolve(success);
  },
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      logger.log(error);
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

export default httpService;
