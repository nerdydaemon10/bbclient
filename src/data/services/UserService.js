import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.js"

export default class UserService {}

UserService.create = async function(param) {
  const response = await client.post("/customers", param)
  return response
}

UserService.findAll = async function(sq=null) {
  const params = ObjectHelper.toUriParams(sq)
  const response = await client.get(`/users?${params}`)
  
  return response.data
}

UserService.update = async function(customer) {
  const response = await client.put(`/customers/${customer.id}`, customer)
  return response.data
}

UserService.remove = async function(id) {
  const response = await client.delete(`/customers/${id}`)
  return response.data
}