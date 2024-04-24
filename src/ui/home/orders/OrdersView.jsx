import { useDispatch } from "react-redux"
import OrdersProvider from "./OrdersProvider.jsx"
import OrdersStyle from "./OrdersStyle.jsx"
import OrdersTable from "./OrdersTable.jsx"
import { useEffect } from "react"
import { setBreadcrumb } from "../../redux/dashboardSlice.js"
import { breadcrumbItems } from "./Util.jsx"

function OrdersView() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems))
  }, [])

  return (
    <OrdersProvider>
      <OrdersStyle />
      <TitleContainer />
      <OrdersTable />
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