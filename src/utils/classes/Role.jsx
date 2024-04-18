import { roles } from "../Config.jsx"

export default class Role {
  static ADMIN = 1
  static EMPLOYEE = 2

  static toRole = (id) => {
    const role = roles.find((role) => role.id == id)

    if (!role) {
        return "N/A"
    }
    
    return role.name
  }
}