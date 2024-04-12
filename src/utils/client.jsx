import axios from "axios"
import AppLocalStorage from "./AppLocalStorage.jsx"

const X_API_KEY = import.meta.env.VITE_X_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const client = axios.create({
  baseURL: BASE_URL
})

client.defaults.headers['Accept'] = 'application/json'
client.defaults.headers['x-api-key'] = X_API_KEY
client.defaults.headers['Authorization'] = `Bearer ${AppLocalStorage.readAccessToken()}`

export default client