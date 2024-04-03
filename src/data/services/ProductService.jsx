import axios from "axios"

import ObjectHelper from "../../utils/helpers/ObjectHelper.jsx"
import StringHelper from "../../utils/helpers/StringHelper.jsx"
import ProductRoutes from "../../utils/routes/ProductRoutes.jsx"

export default class ProductService {}

ProductService.create = async function(product) {
  const response = await axios.post(ProductRoutes.CREATE, product)
  return response
}

ProductService.remove = async function(id) {
  const response = await axios.delete(`${ProductRoutes.REMOVE}/${id}`)
  return response
}

ProductService.update = async function(product) {
  const response = await axios.put(`${ProductRoutes.UPDATE}/${product.id}`, product)
  return response
}

ProductService.findAll = async function(query=null) {
  const params = ObjectHelper.toUriParams(query)
  
  const response = StringHelper.isEmpty(params) 
    ? await axios.get(`${ProductRoutes.FIND_ALL}?sort=-created_at,-updated_at`)
    : await axios.get(`${ProductRoutes.FIND_ALL}?${params}`)

  return response
}