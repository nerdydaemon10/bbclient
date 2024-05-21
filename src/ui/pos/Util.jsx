import { BiFile, BiPackage } from "react-icons/bi"
import { isEmpty, isNil } from "lodash"

export const TabsData = [
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

export const isCheckedOut = (checkouts, item) => {
  return !!checkouts.find(checkout => checkout.id == item.id)
}