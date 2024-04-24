import client from "../../util/client.js"

export default class AuthService {}

AuthService.login = async function(credentials) {
  const response = await client.post("/auth/login", credentials)
  const { token, user } = response.data

  return { token: token, user: user }
}