import axios from "axios"
import AuthRoutes from "../utils/routes/AuthRoutes.jsx"

export default class AuthService {}

AuthService.login = async function(credentials) {
    const response = await axios.post(AuthRoutes.LOGIN, credentials)
    const authorizationHeader = response.headers["authorization"]
    const accessToken = authorizationHeader.split(" ")[1]
    const user = response.data
    
    return [accessToken, user]
}