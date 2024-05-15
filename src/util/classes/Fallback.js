import { isNil } from "lodash"

export default class Fallback {}

Fallback.checkMeta = (data) => {
  const fallback = { current_page: 1, last_page: 1 }

  if (isNil(data)) return fallback
  if (isNil(data.meta)) return fallback

  return data.meta
}
Fallback.checkUser = (user) => {
  const fallback = { id: 0, full_name: "", role: "" }

  if (isNil(user)) return fallback
  
  return user
}      