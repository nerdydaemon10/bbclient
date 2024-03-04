import axios from "axios"

export default class AuthService {}

AuthService.login = async function(credentials) {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth`, credentials)
    return response.data
}