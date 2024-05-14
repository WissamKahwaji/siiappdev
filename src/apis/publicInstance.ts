import axios from "axios";
import baseURL from "../constants/domain";

const publicInstance = axios.create({ baseURL });
publicInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default publicInstance;
