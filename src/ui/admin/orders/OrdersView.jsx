import OrdersStyle from "./OrdersStyle.jsx"
import OrdersTable from "./OrdersTable.jsx"
import ApproveModal from "./ApproveModal.jsx"
import RejectModal from "./RejectModal.jsx"
import { Fragment } from "react"
import OrdersSide from "./OrdersSide.jsx"

function OrdersView() {
  return (
    <Fragment>
      <OrdersStyle />
      <TitleSection />
      <OrdersTable />
      <OrdersSide />
      <ApproveModal />
      <RejectModal />
    </Fragment>
  )
}

function TitleSection() {
  return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Orders</h3>
      <p className="text-body-secondary mb-0">View list of pending orders</p>
    </div>
  )
}

export default OrdersView