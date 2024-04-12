import { paymentMethods } from "../Config.jsx"

export default class PaymentMethod {
  static CASH_ON_DELIVERY = 1
  static SCAN_TO_PAY = 2

  static toMethod = (id) => {
    const method = paymentMethods.find((method) => method.id == id)

    if (!method) {
        return "N/A"
    }
    
    return method.name
  }
}