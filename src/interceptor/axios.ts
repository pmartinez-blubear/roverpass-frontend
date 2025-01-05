import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosRequestInterceptor = () => {
  const axiosPetition = axios.create({
    baseURL: apiUrl,
  });

  axiosPetition.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") ?? '';

      config.headers["Content-Type"] = "application/json"
      config.headers["Access-Control-Expose-Headers"] = "Authorization",'authorization'
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
        if (response.headers['authorization']) {
            const newToken = response.headers['authorization'].split(' ')
            localStorage.setItem('token', newToken[1]) ; // Update the token
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

  return axiosPetition;
};