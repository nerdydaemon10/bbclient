import client from "../../utils/client.jsx"

export default class AuthService {}

AuthService.login = async function(credentials) {
  const response = await client.post("/auth/login", credentials)

  const authorization = response.headers["authorization"]
  const accessToken = authorization.split(" ")[1]
  const user = response.data
  
  return { accessToken, user }
}