import axios from "axios";
import { getLocalStorage } from "../providers/localStorage/localStorageProvider";

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosRequestInterceptor = () => {
  const axiosPetition = axios.create({
    baseURL: apiUrl,
  });

  axiosPetition.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") ?? '';

      config.headers["Content-Type"] = "application/json"
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosPetition.interceptors.response.use(
    (response) => {
        if (response.data?.token) {
            localStorage.setItem('token', response.data.token) ; // Update the token
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

  return axiosPetition;
};