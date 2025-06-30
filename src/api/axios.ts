import axios from "axios";

const BASE_URL = import.meta.env.VITE_PROD_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export default axiosInstance;
