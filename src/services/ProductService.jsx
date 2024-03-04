import axios from "axios"
import ProductRoutes from "../utils/routes/ProductRoutes.jsx"

export default class ProductService {}

ProductService.findAll = async function() {
    const response = await axios.get(ProductRoutes.FIND_ALL)
    const products = response.data
    console.log(products)
    return products
}