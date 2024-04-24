import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.jsx"

export default class ProductService {}

ProductService.create = async function(param) {
  const response = await client.post("/products", param)
  return response.data
}

ProductService.findAll = async function(searchQuery=null) {
  const params = ObjectHelper.toUriParams(searchQuery)
  const response = await client.get(`/products?${params}`)

  return response.data
}

ProductService.update = async function(product) {
  const response = await client.put(`/products/${product.id}`, product)
  return response.data
}

ProductService.remove = async function(id) {
  const response = await client.delete(`/products/${id}`)
  return response.data
}