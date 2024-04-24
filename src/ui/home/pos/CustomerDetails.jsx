import { useDispatch, useSelector } from "react-redux"
import { setPaymentMethod, toggleTable } from "../../redux/posSlice.js"
import { SecondaryButton, FormOptionInput, FormTextFieldInput } from "../../common"
import { findErrorByName } from "../../../util/helper.jsx"
import { PaymentMethodsData } from "../../../util/Config.jsx"
import { isProducts } from "./Util.jsx"

function CustomerDetails() {
  const { table, customer, paymentMethod } = useSelector((state) => state.pos)

  const dispatch = useDispatch()

  const handleChange = (value) => {
    dispatch(setPaymentMethod(value))
  }

  const handleClick = () => {
    dispatch(toggleTable())
  }
  
  return (
    <div className={`customer-details ${customer ? "app-sy-12" : "is-empty"}`}>
      {
        customer ? (
          <CustomerForm 
            customer={customer} 
            paymentMethod={paymentMethod}
            handleChange={handleChange}
          />
        ) : (
          <CustomerEmpty /> 
        )
      }
      <ChooseButton table={table} onClick={handleClick} />
    </div>
  )
}

function CustomerForm({customer, paymentMethod, handleChange}) {
  return (
    <div className="tab-order-info app-sy-12">
      <FormTextFieldInput
        label="Full Name"
        placeholder="Full Name..."
        value={customer.full_name}
        isReadOnly={true}
        feedback={findErrorByName(null, "")}
      />
      <FormTextFieldInput
        label="Phone number"
        placeholder="Phone Number..."
        value={customer.phone_number}
        isReadOnly={true}
        feedback={findErrorByName(null, "")}
      />
      <FormTextFieldInput
        label="Email Address"
        placeholder="Email Address..."
        value={customer.phone_number}
        isReadOnly={true}
        feedback={findErrorByName(null, "")}
      />
      <FormTextFieldInput
        label="Address"
        name="address" 
        placeholder="Address..."
        value={customer.address}
        isReadOnly={true}
        feedback={findErrorByName(null, "")}
      />
      <FormOptionInput
        label="Payment Method"
        name="payment_method"
        options={PaymentMethodsData}
        feedback={findErrorByName(null, "")}
        value={paymentMethod}
        onChange={handleChange}
      />
      <hr />
    </div>
  )
}
function CustomerEmpty() {
  return (
    <div>
      <h6 className="mb-0">No Customer</h6>
      <p>Press &apos;choose&apos; to select a customer.</p>
    </div>
  )
}

function ChooseButton({table, onClick}) {
  return (
    <SecondaryButton 
      isFullWidth={true}
      onClick={onClick}
    >
      { isProducts(table) ? "Choose Customer" : "Cancel Customer" }
    </SecondaryButton>
  )
}

export default CustomerDetails