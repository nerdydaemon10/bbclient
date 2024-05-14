/* eslint-disable react-hooks/exhaustive-deps */
//import OrderDetails from "./OrderDetails.jsx"
import ProductsTable from "./ProductsTable.jsx"
import local from "../../../util/local.js"
import { Fragment } from "react"
import PosStyle from "./PosStyle.jsx"
import OrderSide from "./OrderSide.jsx" 
import TableType from "../../../util/classes/TableType.js"
import CustomersTable from "./CustomersTable.jsx"
import { useSelector } from "react-redux"

function PosView() {
  return (
    <Fragment>
      <PosStyle />
      <Title />
      <PosTable />
      <OrderSide />
    </Fragment>
  )
}
  

function PosTable() {
  const { table } = useSelector((state) => state.pos)

  if (table == TableType.PRODUCTS)
    return (<ProductsTable />)

  return (<CustomersTable />)
}

function Title() {
  const user = local.get("user")
  
  return (
    <div className="title">
      <h3 className="text-body-primary fw-bold mb-0">POS System</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default PosView