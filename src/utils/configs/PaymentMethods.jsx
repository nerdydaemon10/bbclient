import { BiQr, BiWallet } from "react-icons/bi";

const PaymentMethods = [
  {
    id: 1,
    name: "Cash-On-Delivery",
    icon: <BiWallet className="me-1" />,
    value: 1
  },
  {
    id: 2,
    name: "Scan-To-Pay",
    icon: <BiQr className="me-2" />,
    value: 2
  }
]

export default PaymentMethods