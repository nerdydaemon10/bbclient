import Role from "../../util/classes/Role.js"
import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.js"
import local from "../../util/local.js"

export default class OrderService {}

OrderService.create = async function(order) {
  const response = await client.post("/orders", order)
  return response.data
}
OrderService.create = async function(order) {
  const response = await client.post("/orders", order)
  return response.data
}
OrderService.findAll = async function(sq=null) {
  const user = local.get("user")
  const role = Role.toEnum(user.role_id)
  
  const params = ObjectHelper.toUriParams(sq)
  const response = await client.get(`/${role}/orders/?${params}`)
  
  return response.data
}
OrderService.approve = async function(id) {
  const response = await client.patch(`/admin/order/approve/${id}`)
  return response.data
}
OrderService.reject = async function(id) {
  const response = await client.patch(`/admin/order/reject/${id}`)
  return response.data
}