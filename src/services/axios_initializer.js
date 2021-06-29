import axios from 'axios';

const axiosInitializer = {
  config: () => {
    // Request Interceptor
    axios.interceptors.request.use((request) => request, (error) => Promise.reject(error));

    // Response Interceptor
    axios.interceptors.response.use((response) => response, async (error) => {
      if (error && error.response && error.response.status) {
        let errorResponse = '';
        if (error.request.status === 403) {
          errorResponse = 'Forbidden';
        }
        if (error.response.status === 401) {
          errorResponse = 'Unauthorized';
        } else {
          errorResponse = 'Something went wrong';
        }
        throw errorResponse;
      }
    });
  },
};

export default axiosInitializer;
