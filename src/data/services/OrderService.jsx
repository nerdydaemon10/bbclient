import axios from "axios"
import OrderRoutes from "../../utils/routes/OrderRoutes.jsx"

export default class OrderService {}

OrderService.create = async function(order) {
  const response = await axios.post(OrderRoutes.CREATE, order)
  return response
}