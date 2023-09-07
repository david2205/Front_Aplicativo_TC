import axios from "axios"
import Swal from "sweetalert2"
const API_URL = import.meta.env.VITE_API_URL

const connectionApi = axios.create({
    baseURL: API_URL
})

connectionApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data?.message || "No estas autorizado" 
            })
        }

        return Promise.reject(error)
    }
)

export default connectionApi
