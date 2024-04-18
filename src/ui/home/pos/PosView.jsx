import AppLocalStorage from "../../../utils/AppLocalStorage.jsx"
import PosStyle from "./PosStyle.jsx"
import { DashboardMain } from "../Dashboard.jsx"
import PosProvider from "./PosProvider.jsx"
import OrderDetails from "./OrderDetails.jsx"
import { useSelector } from "react-redux"
import CustomersTable from "./CustomersTable.jsx"
import ProductsTable from "./ProductsTable.jsx"
import { isProducts } from "./Util.jsx"
import { BiGridAlt } from "react-icons/bi"

function PosView() {
  const { table } = useSelector((state) => state.pos)

  return (
    <PosProvider>
      <PosStyle />
      <DashboardMain>
        <TitleContainer />
        {
          isProducts(table) ? (
            <ProductsTable />
          ) : (
            <CustomersTable />
          )
        }
        <OrderDetails />
      </DashboardMain>
    </PosProvider>
  )
}

function TitleContainer() {
  const user = AppLocalStorage.readUser()

  return (
    <div className="title-container">
      <h3 className="mb-0">POS System</h3>
      <p className="mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default PosView