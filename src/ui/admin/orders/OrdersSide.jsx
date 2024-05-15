/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { Button, CheckoutList, DateInput, SearchFieldInput, SelectInput } from "../../common/index.jsx"
import { orderStatuses, paymentMethods } from "../../../util/Config.jsx"
import { OrderStatus, PaymentMethod } from "../../../util/classes"
import { isNil } from "lodash"
import { setSq } from "../../redux/ordersSlice.js"
import { BiRotateLeft } from "react-icons/bi"

function OrdersSide() {
  const { sq, viewOrder } = useSelector((state) => state.orders)
  const hasViewOrder = !isNil(viewOrder)

  const title = !hasViewOrder
    ? "Filter Orders" 
    : "Checkouts"
  let content = <FilterOrders />

  if (hasViewOrder) {
    content = (
      <CheckoutList 
        checkouts={viewOrder.checkouts} 
        isControlsDisabled
        isOdd={false} 
      />
    )
  }

  return (
    <div className="card orders-side">
      <div className="card-header p-2">
        <h6 className="card-title fw-semibold mb-0">
          {title}
        </h6>
      </div>
      <div className="card-body overflow-y-auto p-0">
        {content}
      </div>
    </div>
  )
}

function FilterOrders() {
  const { sq, salespersons } = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq(e))
  }

  return (
    <div className=" d-flex flex-column p-2 gap-2">
      <DateInput 
        label="Date Start" 
        name="start_date" 
        value={sq.start_date}
        onChange={handleChange} 
      />
      <DateInput 
        label="Date End" 
        name="end_date" 
        value={sq.end_date}
        onChange={handleChange} 
      />
      <SelectInput
        isOptional
        label="Salesperson"
        name="employee_id"
        options={salespersons}
        value={sq.employee_id}
        valueSelector="id"
        onChange={handleChange}
        onRender={(option) => `${option.full_name}`}
      />
      <SearchFieldInput
        label="Customer Name"
        name="customer"
        placeholder={"Search by Customer..."}
        value={sq.customer}
        onChange={handleChange}
      />
      <SelectInput
        isOptional
        label="Status"
        name="status"
        options={orderStatuses}
        value={sq.status}
        onChange={handleChange}
        onRender={(option) => `${OrderStatus.toStatus(option)}`}
      />
      <SelectInput
        isOptional
        label="Payment Method"
        name="payment_method"
        options={paymentMethods}
        value={sq.payment_method}
        onChange={handleChange}
        onRender={(option) => `${PaymentMethod.toMethod(option)}`}
      />
      <hr className="mt-2 mb-2"/>
      <Button variant="outline-dark">
        <BiRotateLeft className="me-1" />
        Reset Filter
      </Button>
    </div>
  )
}
export default OrdersSide