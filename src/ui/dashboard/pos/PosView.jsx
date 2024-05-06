/* eslint-disable react-hooks/exhaustive-deps */
import PosStyle from "./PosStyle.jsx"
import PosProvider from "./PosProvider.jsx"
import OrderDetails from "./OrderDetails.jsx"
import { useSelector } from "react-redux"
import CustomersTable from "./CustomersTable.jsx"
import ProductsTable from "./ProductsTable.jsx"
import { isProducts } from "./Util.jsx"
import local from "../../../util/local.js"

function PosView() {
  const { table } = useSelector((state) => state.pos)

  return (
    <PosProvider>
      <PosStyle />
      <TitleContainer />
        {isProducts(table) ? (
          <ProductsTable />
        ) : (
          <CustomersTable />
        )}
        <OrderDetails />
    </PosProvider>
  )
}

function TitleContainer() {
  const user = local.get("user")
  
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">POS System</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default PosView