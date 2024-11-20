import axios from "axios"


//const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://gpo.angohost.ao/api"
const API_BASE_URL_LOCAL =  import.meta.env.VITE_API_PROD || "http://localhost:7000/api"
const apiGPO=axios.create({
    baseURL:  API_BASE_URL_LOCAL,

})
export default apiGPO;
