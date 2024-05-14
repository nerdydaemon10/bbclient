import { lowerCase } from "lodash"
import { StatusesData } from "../Config.jsx"

export default class Status {
  static toObject = (key) => {
    const object = StatusesData.find((status) => status.key == lowerCase(key))
    return object
  }
}