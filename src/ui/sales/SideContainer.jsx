/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { paymentMethods, orderStatuses } from "../../util/Config.jsx"
import OrderStatus from "../../util/classes/OrderStatus.js"
import PaymentMethod from "../../util/classes/PaymentMethod.js"
import { Button, CheckoutList, DateInput, SearchFieldInput, SelectInput } from "../common/index.jsx"
import { setSq } from "../redux/salesSlice.js"
import { BiDownload } from "react-icons/bi"
import { isNil } from "lodash"
import { useDownloadSalesMutation } from "../../data/services/sales.js"

function SideContainer() {
  const { sale } = useSelector((state) => state.sales)
  const title = isNil(sale) ? "Filter Sales" : "Checkouts"
  const content = isNil(sale) ? (
    <FilteringContainer />
  ) : (
    <CheckoutList 
      checkouts={sale.checkouts} 
      isControlsDisabled
      isOdd={false}
    />
  )

  return (
    <div className="card side-container">
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

function FilteringContainer() {
  const dispatch = useDispatch()
  const { sq, salespersons } = useSelector((state) => state.sales)

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
      <ExportButton />
    </div>
  )
}
function ExportButton() {
  const { sq } = useSelector((state) => state.sales)
  const [downloadSales, { isLoading }] = useDownloadSalesMutation()
  
  const handleDownload = (sq) => {
    downloadSales(sq)
  }

  return (
    <Button
      variant="outline-dark"
      isLoading={isLoading}
      onClick={() => handleDownload(sq)}
    >
      <BiDownload className="me-1" />
      Export as Excel
    </Button>
  )
}

export default SideContainer