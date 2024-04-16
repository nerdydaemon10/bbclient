import { orderStatuses } from "../Config.jsx"

export default class OrderStatus {
  static PENDING = 1
  static APPROVED = 2
  static REJECTED = 3
  
  static toStatus = (id) => {
    const status = orderStatuses.find((status) => status.id == id)

    if (!status) return "N/A"
    
    return status.name
  }
}