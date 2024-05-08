import { Fragment } from "react"
import OrdersStyle from "./OrdersStyle.jsx"
import OrdersTable from "./OrdersTable.jsx"

function OrdersView() {
  return (
    <Fragment>
      <OrdersStyle />
      <TitleContainer />
      <OrdersTable />
    </Fragment>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Orders</h3>
      <p className="text-body-secondary mb-0">View list of pending orders</p>
    </div>
  )
}

export default OrdersView