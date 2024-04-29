import local from "../../util/local.js"
import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.js"
import Role from "../../util/classes/Role.js"

export default class OrderService {}

OrderService.create = async function(order) {
  const response = await client.post("/orders", order)
  return response.data
}
OrderService.findAll = async function(sq=null) {
  const user = local.get("user")
  const roleId = user ? user.role_id : undefined
  const role = roleId == Role.ADMIN ? "admin" : ""
  const params = ObjectHelper.toUriParams(sq)
  
  const response = await client.get(`${role}/orders/?${params}`)

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