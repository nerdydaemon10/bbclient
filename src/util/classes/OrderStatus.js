import { OrderStatusesData } from "../Config.jsx"

export default class OrderStatus {
  static PENDING = 1
  static APPROVED = 2
  static REJECTED = 3

  static toObject = (key) => {
    const status = OrderStatusesData.find((status) => status.key == key)
    return status
  }

  static toStatus = (key) => {
    const status = OrderStatusesData.find((status) => status.key == key)
    
    if (!status) return "N/A"

    return status.name
  }

  static toBadge = (key) => {
    const status = OrderStatusesData.find((category) => category.key == key)

    if (!status) return "bg-secondary"
    
    return status.badge
  }
}