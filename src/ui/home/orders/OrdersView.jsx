import { BiChart, BiGrid, BiGridAlt, BiHomeAlt, BiSolidGridAlt } from "react-icons/bi"
import { DashboardMain } from "../Dashboard.jsx"
import OrdersProvider from "./OrdersProvider.jsx"
import OrdersStyle from "./OrdersStyle.jsx"
import OrdersTable from "./OrdersTable.jsx"

function OrdersView() {
  return (
    <OrdersProvider>
      <OrdersStyle />
      <DashboardMain>
        <TitleContainer />
        <OrdersTable />
      </DashboardMain>
    </OrdersProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="mb-0">Orders</h3>
      <p className="mb-0">Please add some description...</p>
    </div>
  )
}

export default OrdersView