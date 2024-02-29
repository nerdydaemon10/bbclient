import axios from "axios"
import { BASE_URL } from "../utils/configs/AppConfig.jsx"

export default class AuthService {}

AuthService.login = async function(credentials) {
    console.log(credentials)
    const response = await axios.post(`${BASE_URL}/auth`, credentials, { 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return response.data
}