import { BiFile, BiPackage } from "react-icons/bi"

const PosTabs = [
  {
    id: 1,
    name: "Check List",
    icon: <BiPackage className="me-1" size={18} />,
    value: "is-checkout-list"
  },
  {
    id: 2,
    name: "Order Info",
    icon: <BiFile className="me-1" size={18} />,
    value: "is-order-info"
  }
]

export default PosTabs