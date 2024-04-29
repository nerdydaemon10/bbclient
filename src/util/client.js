import axios from "axios"
import local from "./local.js"

const X_API_KEY = import.meta.env.VITE_X_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const client = axios.create({
  baseURL: BASE_URL
})

client.interceptors.request.use(
  (config) => {
    const token = local.get("token")

    config.headers["Accept"] = 'application/json'
    config.headers["x-api-key"] = X_API_KEY
    config.headers["Authorization"] = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error)
)

export default client