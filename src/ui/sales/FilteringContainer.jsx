import { useDispatch, useSelector } from "react-redux";
import { paymentMethods, orderStatuses } from "../../util/Config.jsx";
import OrderStatus from "../../util/classes/OrderStatus.js";
import PaymentMethod from "../../util/classes/PaymentMethod.js";
import { DateInput, SearchFieldInput, SelectInput } from "../common/index.jsx";
import { setSq } from "../redux/salesSlice.js";
import { useContext } from "react";
import { SalesContext } from "./SalesProvider.jsx";

function FilteringContainer() {
  const { sq } = useSelector((state) => state.sales)
  const { searchSales } = useContext(SalesContext)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
    searchSales.cancel()
  }

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
    </div>
  )
}

export default FilteringContainer