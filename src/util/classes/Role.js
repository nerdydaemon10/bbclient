import { RolesData } from "../Config.jsx"

export default class Role {
  static ADMIN = 1
  static EMPLOYEE = 2

  static toRole = (key) => {
    const role = RolesData.find((role) => role.key == key)

    if (!role) {
        return "N/A"
    }

    return role.name
  }
  static toEnum = (key) => {
    const role = RolesData.find((role) => role.key == key)
    
    if (!role) {
      return ""
    }

    return role.enum
  }
}