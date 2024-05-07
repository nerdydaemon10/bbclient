import { BiFile, BiPackage } from "react-icons/bi"
import TableType from "../../../util/classes/TableType.js"

const productCols = ["Code", "Name", "Description", "Category", "Stocks", "Price/SRP", "Action"]
const customerCols = ["Full Name", "Address", "Phone Number", "Email Address", "Action"]

const Tabs = [
  {
    name: "Checkouts",
    icon: <BiPackage className="me-1" size={18} />,
    value: "is-checkouts"
  },
  {
    name: "Customer",
    icon: <BiFile className="me-1" size={18} />,
    value: "is-customer"
  }
]

function hasCheckouts(checkouts) {
  return checkouts.length > 0
}

function isCheckedOut(checkouts, id) {
  return !!checkouts.find(checkout => checkout.id == id)
}

function isProducts(table) {
  return table == TableType.PRODUCTS
}

function hasIncompleteDetails(checkouts, customer) {
  return (checkouts.length == 0) || (customer == null)
}

export {
  productCols,
  customerCols,
  Tabs,
  hasCheckouts,
  isCheckedOut,
  isProducts,
  hasIncompleteDetails
}