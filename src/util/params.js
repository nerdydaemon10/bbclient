import { first } from "lodash"
import { productCategories } from "./Config.jsx"

export const CustomerParam = {
  id: 0,
  full_name: "",
  address: "",
  phone_number: "",
  email_address: ""
}
export const EmployeeParam = {
  id: 0,
  full_name: "",
  address: "",
  phone_number: "",
  email_address: ""
}
export const ProductParam = {
  id: 0,
  name: "",
  description: "",
  category_id: first(productCategories),
  quantity: "",
  srp: "",
  member_price: ""
}