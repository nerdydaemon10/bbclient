import { useDispatch, useSelector } from "react-redux"
import { setPaymentMethod, toggleTable } from "../../redux/posSlice.js"
import { Button, FormOptionInput, FormTextFieldInput, OptionInput, TextFieldInput } from "../../common"
import { findErrorByName } from "../../../util/helper.jsx"
import { PaymentMethodsData } from "../../../util/Config.jsx"
import { isProducts } from "./Util.jsx"
import { BiHide, BiShow, BiSolidHandUp, BiSolidHide, BiUser } from "react-icons/bi"

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
    <div className={`customer-details p-2`}>
      {
        customer ? (
          <CustomerForm 
            table={table}
            customer={customer} 
            paymentMethod={paymentMethod}
            onClick={handleClick}
            onChange={handleChange}
          />
        ) : (
          <CustomerEmpty table={table} onClick={handleClick} /> 
        )
      }
    </div>
  )
}

function CustomerForm({table, customer, paymentMethod, onChange, onClick}) {
  return (
    <div className="d-flex flex-column gap-2">
      <TextFieldInput 
        label="Full Name"
        placeholder="Full Name..."
        isReadOnly={true}
        value={customer.full_name}
      />
      <TextFieldInput
        label="Phone number"
        placeholder="Phone Number..."
        isReadOnly={true}
        value={customer.phone_number}
      />
      <TextFieldInput
        label="Email Address"
        placeholder="Email Address..."
        isReadOnly={true}
        value={customer.phone_number}
      />
      <TextFieldInput
        label="Address"
        name="address" 
        placeholder="Address..."
        isReadOnly={true}
        value={customer.address}
      />
      <OptionInput
        label="Payment Method"
        name="payment_method"
        options={PaymentMethodsData}  
        value={paymentMethod}
        onChange={onChange}
      />
      <hr className="my-2" />
      <ChooseButton table={table} onClick={onClick} />
    </div>
  )
}
function CustomerEmpty({table, onClick}) {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h6 className="text-body-primary mb-0">No Customer.</h6>
        <p className="text-body-secondary fs-7">
          {
            isProducts(table) ? (
              <>
                Press <em>&apos;Show Customers&apos;</em> to switch table.
              </>
            ) : (
              <>
                Press <em>&apos;choose&apos;</em> to select a customer.
              </>
            )
          }
        </p>
        <ChooseButton table={table} onClick={onClick} />
      </div>
    </div>
  )
}
function ChooseButton({table, onClick}) {
  return (
    <Button
      variant="outline-dark"
      isFullWidth={false}
      onClick={onClick}
    >
    { 
      isProducts(table) ? (
        <>
          <BiShow className="me-1" />
          Show Customers
        </>
      ) : (
        <>
          <BiHide className="me-1" />
          Hide Customers
        </>
      )
    }
    </Button>
  )
}

export default CustomerDetails