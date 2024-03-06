import axios from "axios"
import ProductRoutes from "../utils/routes/ProductRoutes.jsx"

export default class ProductService {}

ProductService.create = async function(product) {
    const response = await axios.post(ProductRoutes.CREATE, product)
    console.log(response)
    return null
}

ProductService.findAll = async function() {
    const response = await axios.get(ProductRoutes.FIND_ALL)
    const products = response.data
    
    return products
}