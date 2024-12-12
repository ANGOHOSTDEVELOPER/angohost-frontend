import axios from "axios"

// const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api2.angohost.ao/v1/api" old
const API_BASE_URL =  import.meta.env.VITE_API_PROD || "https://api4.angohost.ao/v1/api"
const API_BASE_URL_LOCAL =  "http://localhost:3334/v1/api"

const apiMode ={
    prod: API_BASE_URL,
    local: API_BASE_URL_LOCAL
}
const api=axios.create({
    baseURL:apiMode.prod 
})
export default api;

// Nothing is ever as it seems, like a cat saying "Ha Hee"
// It might sound like random noise to you, but to me it's an uplifting tune

// Music is everywhere my friend, so open your heart and you will ascend
// To the heights that only angels see, let's sing it together the song of "Ha Hee"

// Open your heart and let the music flow in, awaken the universe that’s laying within
// This life can be magic if you open your eyes, a cat is a symphony in disguise
