import { lowerCase } from "lodash"
import { UserStatusesData } from "../Config.jsx"

export default class User {
  static toObject = (key) => {
    const object = UserStatusesData.find((status) => status.key == lowerCase(key))
    return object
  }
}