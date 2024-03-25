import axios from "axios"
import OrderRoutes from "../utils/routes/OrderRoutes.jsx"

export default class OrderService {}

OrderService.create = async function(order) {
  const response = await axios.post(OrderRoutes.CREATE, order)
  return response
}
/*
ProductService.remove = async function(id) {
  const response = await axios.delete(`${ProductRoutes.REMOVE}/${id}`)
  return response
}

ProductService.update = async function(product) {
  const response = await axios.put(`${ProductRoutes.UPDATE}/${product.id}`, product)
  return response
}

ProductService.findAll = async function(params=null) {
  const uriParams = ObjectHelper.toUriParams(params)
  
  const response = StringHelper.isEmpty(uriParams) 
    ? await axios.get(`${ProductRoutes.FIND_ALL}`)
    : await axios.get(`${ProductRoutes.FIND_ALL}?${uriParams}`)
  
  return response
}*/