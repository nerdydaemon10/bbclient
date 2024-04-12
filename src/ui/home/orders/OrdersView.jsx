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
        <BreadcrumbContainer />
        <OrdersTable />
      </DashboardMain>
    </OrdersProvider>
  )
}

function BreadcrumbContainer() {
  return (
    <ol className="app-breadcrumb breadcrumb-container">
      <li className="app-breadcrumb-item">
        <span className="app-breadcrumb-item-icon">
          <BiGridAlt className="me-1" />
        </span>
        <a href="#">
          POS System
        </a>
      </li>
      <li className="app-breadcrumb-item is-active">
        <a href="#">  
          Orders
        </a>
      </li>
    </ol>
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