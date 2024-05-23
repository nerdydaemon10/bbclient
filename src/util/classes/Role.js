import { RolesData } from "../Config.jsx"

export default class Role {
  static ADMIN = "admin"
  static EMPLOYEE = "employee"
  
  static isAdmin = (key) => {
    return key == this.ADMIN
  }
  static toNormalize = (key) => {
    const role = RolesData.find((role) => role.key == key)

    if (!role) {
        return ""
    }

    return role.normalize
  }
  static toRole = (normalize) => {
    const role = RolesData.find((role) => role.normalize == normalize)

    if (!role) {
        return "N/A"
    }

    return role.name
  }
  static toObject = (normalize) => {
    const object = RolesData.find((role) => role.normalize == normalize)
    return object
  }
}