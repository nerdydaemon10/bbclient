import { first } from "lodash"
import { productCategories } from "../util/Config.jsx"

const CustomerDto = {
  id: 0,
  full_name: "",
  address: "",
  phone_number: "",
  email_address: ""
}
const EmployeeDto = {
  id: 0,
  full_name: "",
  address: "",
  phone_number: "",
  email_address: ""
}
const ProductDto = {
  id: 0,
  name: "",
  description: "",
  category_id: first(productCategories),
  quantity: "",
  srp: "",
  member_price: ""
}
const OrderDto = {
  id: 0,
  reference_number: ""
}

export { CustomerDto, EmployeeDto, ProductDto, OrderDto }