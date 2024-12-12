import axios from "axios"



const apiUrl={
    prod:import.meta.env.VITE_API_PROD || "https://gpo.angohost.ao/api",
    local:import.meta.env.VITE_API_PROD || "http://localhost:7000/api"
}
const apiGPO=axios.create({
    baseURL:   apiUrl.local,

})
export default apiGPO;
