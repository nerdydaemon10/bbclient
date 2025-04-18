/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { paymentMethods, orderStatuses } from "../../util/Config.jsx"
import OrderStatus from "../../util/classes/OrderStatus.js"
import PaymentMethod from "../../util/classes/PaymentMethod.js"
import { Button, CheckoutList, DateInput, SearchFieldInput, SelectInput } from "../common/index.jsx"
import { selectSale, selectCheckoutsSize, setSq, resetSq } from "../redux/salesSlice.js"
import { BiDownload, BiRotateLeft } from "react-icons/bi"
import { isNil } from "lodash"
import { useDownloadSalesMutation } from "../../data/services/sales.js"

function SalesSide() {
  const sale = useSelector(selectSale)
  const checkoutsSize = useSelector(selectCheckoutsSize)
  const isEmptySale = isNil(sale)

  return (
    <div className="card sales-side">
      <div className="card-header p-2">
        <h6 className="card-title fw-semibold mb-0">
          {isEmptySale ? "Filter Sales" : `Checkouts (${checkoutsSize})`}
        </h6>
      </div>
      <div className="card-body overflow-y-auto p-0">
        {
          isEmptySale 
          ? (<FilterSales />)
          : (
            <CheckoutList
              checkouts={sale.checkouts} 
              isControlsDisabled
              isOdd={false} 
            />
          )
        }
      </div>
    </div>
  )
}

function FilterSales() {
  const sq = useSelector((state) => state.sales.sq)
  const salespersons = useSelector((state) => state.sales.salespersons)

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
      <Button 
        className="mt-1"
        variant="outline-dark"
        onClick={handleReset}
      >
        <BiRotateLeft className="me-1" />
        Reset Filter
      </Button>
      <hr className="mt-1 mb-1"/>
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
      variant="dark"
      isLoading={isLoading}
      onClick={() => handleDownload(sq)}
    >
      <BiDownload className="me-1" />
      Export as Excel
    </Button>
  )
}

export default SalesSide