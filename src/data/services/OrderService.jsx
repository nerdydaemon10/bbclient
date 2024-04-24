import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.jsx"

export default class OrderService {}

OrderService.create = async function(order) {
  const response = await client.post("/orders", order)
  return response.data
}

OrderService.findAll = async function(searchQuery=null) {
  const params = ObjectHelper.toUriParams(searchQuery)
  const response = await client.get(`/orders?${params}`)

  return response.data
}