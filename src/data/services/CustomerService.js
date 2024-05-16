import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.js"

export default class CustomerService {}

CustomerService.create = async function(param) {
  const response = await client.post("/customers", param)
  return response
}
CustomerService.findAll = async function(sq=null) {
  const params = ObjectHelper.toUriParams(sq)
  const response = await client.get(`/customers?${params}`)
  
  return response.data
}
CustomerService.update = async function(customer) {
  const response = await client.put(`/customers/${customer.id}`, customer)
  return response.data
}
CustomerService.remove = async function(id) {
  const response = await client.delete(`/customers/${id}`)
  return response.data
}