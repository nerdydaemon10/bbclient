/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { Button, CheckoutList, DateInput, ReceiptList, SearchFieldInput, SelectInput } from "../../common/index.jsx"
import { orderStatuses, paymentMethods } from "../../../util/Config.jsx"
import { OrderStatus, PaymentMethod } from "../../../util/classes"
import { isNil } from "lodash"
import { resetSq, selectCheckoutSize, selectReceipts, setSq } from "../../redux/ordersSlice.js"
import { BiRotateLeft } from "react-icons/bi"

function OrdersSide() {
  const viewOrder = useSelector((state) => state.orders.viewOrder)
  const checkoutsSize = useSelector(selectCheckoutSize)
  const receipts = useSelector(selectReceipts)
  const emptyViewOrder = isNil(viewOrder)

  return (
    <div className={`orders-side d-grid gap-2 ${emptyViewOrder ? "" : "has-view-order"}`}>
      <div className="card">
        <div className="card-header p-2">
          <h6 className="card-title fw-semibold mb-0">
            {emptyViewOrder ? "Filter Orders" : `Checkouts (${checkoutsSize})`}
          </h6>
        </div>
        <div className="card-body overflow-y-auto p-0">
          {
            emptyViewOrder 
            ? (<FilterOrders />) 
            : (
              <CheckoutList
                checkouts={viewOrder.checkouts} 
                isControlsDisabled
                isOdd={false} 
              />
            )
          }
        </div>
      </div>
      {!emptyViewOrder && (<ReceiptList receipts={receipts} />)}
    </div>
  )
}

function FilterOrders() {
  const { sq, salespersons } = useSelector((state) => state.orders)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq(e))
  }

  const handleReset = () => {
    dispatch(resetSq())
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
      <hr className="mt-1 mb-1"/>
      <Button 
        variant="outline-dark"
        onClick={handleReset}
      >
        <BiRotateLeft className="me-1" />
        Reset Filter
      </Button>
    </div>
  )
}
export default OrdersSide