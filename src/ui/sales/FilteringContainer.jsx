import { useDispatch, useSelector } from "react-redux";
import { paymentMethods, orderStatuses } from "../../util/Config.jsx";
import OrderStatus from "../../util/classes/OrderStatus.js";
import PaymentMethod from "../../util/classes/PaymentMethod.js";
import { DateInput, SearchFieldInput, SelectInput } from "../common/index.jsx";
import { setSq } from "../redux/salesSlice.js";

function FilteringContainer() {
  const { sq } = useSelector((state) => state.sales)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
  }

  return (
    <div className="filtering-container d-flex flex-column app-border p-2 gap-2">
      <div>
        <label className="app-text-label mb-1">Date Start</label>
        <DateInput 
          name="date_start" 
          value={sq.date_start} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label className="app-text-label mb-1">Date End</label>
        <DateInput 
          name="date_end" 
          value={sq.date_end} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label className="app-text-label mb-1">Employee Name</label>
        <SearchFieldInput 
          name="user.full_name"
          placeholder={"Search by Employee..."}
          value={sq["user.full_name"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="app-text-label mb-1">Customer Name</label>
        <SearchFieldInput
          name="customer.full_name" 
          placeholder={"Search by Customer..."}
          value={sq["customer.full_name"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="app-text-label mb-1">Status</label>
        <SelectInput
          name="status"
          options={orderStatuses}
          isAllCategoriesEnabled
          value={sq.status}
          onChange={handleChange}
          onRender={(option) => `${OrderStatus.toStatus(option)}`}
        />
      </div>
      <div>
        <label className="app-text-label mb-1">Payment Method</label>
        <SelectInput
          name="payment_method"
          options={paymentMethods}
          isAllCategoriesEnabled
          value={sq.payment_method}
          onChange={handleChange}
          onRender={(option) => `${PaymentMethod.toMethod(option)}`}
        />
      </div>
    </div>
  )
}

export default FilteringContainer