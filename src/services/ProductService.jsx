import axios from "axios"
import ProductRoutes from "../utils/routes/ProductRoutes.jsx"

export default class ProductService {}

ProductService.create = async function(product) {
  const response = await axios.post(ProductRoutes.CREATE, product)
  return response.data
}

ProductService.remove = async function(id) {
  const response = await axios.delete(`${ProductRoutes.REMOVE}/${id}`)
  return response.data
}

ProductService.update = async function(product) {
  const response = await axios.put(`${ProductRoutes.UPDATE}/${product.id}`, product)
  return response.data
}

ProductService.findAll = async function() {
    const response = await axios.get(ProductRoutes.FIND_ALL)
    const products = response.data

    return products
}