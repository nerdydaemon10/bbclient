/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { paymentMethods, orderStatuses } from "../../../util/Config.jsx";
import OrderStatus from "../../../util/classes/OrderStatus.js";
import PaymentMethod from "../../../util/classes/PaymentMethod.js";
import { Button, DateInput, SearchFieldInput, SelectInput } from "../../common";
import { exportAsExcel, setSq } from "../../redux/salesSlice.js";
import { useContext, useEffect } from "react";
import { SalesContext } from "./SalesProvider.jsx";
import { BiDownload } from "react-icons/bi";
import moment from "moment";

function FilteringContainer() {
  const dispatch = useDispatch()

  const { sq, exportAsExcelResponse } = useSelector((state) => state.sales)
  const { isLoading, isSuccess, data } = exportAsExcelResponse
  const { searchSales } = useContext(SalesContext)

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
    searchSales.cancel()
  }

  const handleClick = () => {
    dispatch(exportAsExcel(sq))
  }

  useEffect(() => {
    if (!isSuccess) return

    const url = URL.createObjectURL(data)

    const link = document.createElement('a')

    link.href = url
    link.setAttribute("download", `SALES_REPORT_${moment.now()}.xlsx`)
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [isSuccess])
  
  return (
    <div className="filtering-container d-flex flex-column border rounded p-2 gap-2">
      <DateInput 
        label="Date Start" 
        name="date_start" 
        value={sq.date_start}
        onChange={handleChange} 
      />
      <DateInput 
        label="Date End" 
        name="date_end" 
        value={sq.date_end}
        onChange={handleChange} 
      />
      <SearchFieldInput
        label="Employee Name"
        name="user.full_name"
        placeholder={"Search by Employee..."}
        value={sq["user.full_name"]}
        onChange={handleChange}
      />
      <SearchFieldInput
        label="Customer Name"
        name="customer.full_name"
        placeholder={"Search by Customer..."}
        value={sq["customer.full_name"]}
        onChange={handleChange}
      />
      <SelectInput
        label="Status"
        name="status"
        options={orderStatuses}
        isAllCategoriesEnabled
        value={sq.status}
        onChange={handleChange}
        onRender={(option) => `${OrderStatus.toStatus(option)}`}
      />
      <SelectInput
        label="Payment Method"
        name="payment_method"
        options={paymentMethods}
        isAllCategoriesEnabled
        value={sq.payment_method}
        onChange={handleChange}
        onRender={(option) => `${PaymentMethod.toMethod(option)}`}
      />
      <hr className="mt-2 mb-2"/>
      <Button 
        variant="outline-dark"
        isLoading={isLoading}
        onClick={handleClick}
      >
        <BiDownload className="me-1" />
        Export as Excel
      </Button>
    </div>
  )
}

export default FilteringContainer