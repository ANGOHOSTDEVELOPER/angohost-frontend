import axios from "axios"
import Cookies from "js-cookie"

// const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api2.angohost.ao/v1/api" old
const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api4.angohost.ao/v1/api"
const API_BASE_URL_LOCAL =  "http://localhost:3334/v1/api"

const apiMode ={
    prod: API_BASE_URL,
    local: API_BASE_URL_LOCAL
}
const api = axios.create({
    baseURL: apiMode.prod,
   
})


api.interceptors.request.use((config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
export default api;

