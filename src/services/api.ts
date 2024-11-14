import axios from "axios"

// const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api2.angohost.ao/v1/api" old
const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api4.angohost.ao/v1/api"
//const API_BASE_URL_LOCAL =  import.meta.env.VITE_API_PROD || "http://localhost:3334/v1/api"
const api=axios.create({
    baseURL: API_BASE_URL,

})
export default api;
