import axios from "axios"
import { BASE_URL } from "../utils/configs/AppConfig.jsx"

export default class AuthService {}

AuthService.login = async function(credentials) {
    const data = {
        username: credentials.usernmame,
        password: credentials.password
    }


    const response = await axios.post(`${BASE_URL}/auth`, data, { 
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return response.data
}