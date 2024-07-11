// axiosInstance.js
import axios from 'axios';
import { getRefreshedAccessToken } from './redux/authSlice';
import store from "../src/store"

const axiosInstance = axios.create({
  //baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject access token into headers
axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = store.getState().auth.accessToken
    //const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken != `null`) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(request)
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error)
    // Check if error status is 401 and there's no originalRequest.retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.refreshToken
        const { accessToken: newAccessToken } = await getRefreshedAccessToken(refreshToken) // Call API to refresh token

        // Retry original request with new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        // Handle refresh token failure (e.g., logout user, redirect to login)
        // You can dispatch logout action or handle it based on your app logic
        // Example:
        // store.dispatch(logoutAction());
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
