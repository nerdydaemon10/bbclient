/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { paymentMethods, orderStatuses } from "../../util/Config.jsx"
import OrderStatus from "../../util/classes/OrderStatus.js"
import PaymentMethod from "../../util/classes/PaymentMethod.js"
import { Button, CheckoutList, DateInput, SearchFieldInput, SelectInput } from "../common/index.jsx"
import { exportAsExcel, fetchUsers, resetStates, setSq } from "../redux/salesSlice.js"
import { useContext, useEffect } from "react"
import { SalesContext } from "./SalesProvider.jsx"
import { BiDownload } from "react-icons/bi"
import moment from "moment"
import { isEmpty } from "lodash"

function SideContainer() {
  const { sale } = useSelector((state) => state.sales)

  return (
    <div className="card side-container">
      <div className="card-header p-2">
        <h6 className="card-title fw-semibold mb-0">
        {isEmpty(sale) ? "Filter Sales" : "Checkouts"}
        </h6>
      </div>
      <div className="card-body overflow-y-auto p-0">
        {isEmpty(sale) ? (
          <FilteringContainer />
        ) : (
          <CheckoutList 
            checkouts={sale.checkouts} 
            isControlsDisabled
            isOdd={false}
          />
        )}
      </div>
    </div>
  )
}

function FilteringContainer() {
  const { searchSales } = useContext(SalesContext)
  const { salesSq, fetchUsersResponse, exportAsExcelResponse } = useSelector((state) => state.sales)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq({ ...salesSq, [e.target.name]: e.target.value }))
    searchSales.cancel()
  }

  const handleClick = () => {
    dispatch(exportAsExcel(salesSq))
  }

  useEffect(() => {
    if (!fetchUsersResponse.isLoaded) {
      dispatch(fetchUsers())
    }
  }, [fetchUsersResponse.isLoaded])

  useEffect(() => {
    if (!exportAsExcelResponse.isSuccess) return

    const url = URL.createObjectURL(exportAsExcelResponse.data)
    const link = document.createElement('a')

    link.href = url
    link.setAttribute("download", `SALES_REPORT_${moment.now()}.xlsx`)
    document.body.appendChild(link)

    link.click()

    return () => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      dispatch(resetStates())
    }
  }, [exportAsExcelResponse.isSuccess])

  return (
    <div className=" d-flex flex-column p-2 gap-2">
      <DateInput 
        label="Date Start" 
        name="date_start" 
        value={salesSq.date_start}
        onChange={handleChange} 
      />
      <DateInput 
        label="Date End" 
        name="date_end" 
        value={salesSq.date_end}
        onChange={handleChange} 
      />
      <SelectInput
        isOptional
        label="Salesperson"
        name="employee_id"
        options={fetchUsersResponse.data}
        value={salesSq.employee_id}
        valueSelector="id"
        onChange={handleChange}
        onRender={(option) => `${option.full_name}`}
      />
      <SearchFieldInput
        label="Customer Name"
        name="customer.full_name"
        placeholder={"Search by Customer..."}
        value={salesSq["customer.full_name"]}
        onChange={handleChange}
      />
      <SelectInput
        isOptional
        label="Status"
        name="status"
        options={orderStatuses}
        value={salesSq.status}
        onChange={handleChange}
        onRender={(option) => `${OrderStatus.toStatus(option)}`}
      />
      <SelectInput
        label="Payment Method"
        name="payment_method"
        options={paymentMethods}
        isOptional
        value={salesSq.payment_method}
        onChange={handleChange}
        onRender={(option) => `${PaymentMethod.toMethod(option)}`}
      />
      <hr className="mt-2 mb-2"/>
      <Button
        variant="outline-dark"
        isLoading={exportAsExcelResponse.isLoading}
        onClick={handleClick}
      >
        <BiDownload className="me-1" />
        Export as Excel
      </Button>
    </div>
  )
}
export default SideContainer