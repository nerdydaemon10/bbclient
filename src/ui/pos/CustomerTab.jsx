import { isNil } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import TableType from "../../util/classes/TableType.js"
import { Button, TabsInput, TextFieldInput } from "../common"
import { BiHide, BiShow } from "react-icons/bi"
import { Fragment } from "react"
import { PaymentMethodsData } from "../../util/Config.jsx"
import { setAmount, setPaymentMethod, toggleTable } from "../redux/posSlice.js"

function CustomerTab() {
  const dispatch = useDispatch()
  const { table, customer, paymentMethod, amount } = useSelector((state) => state.pos)

  const handlePaymentMethodChange = (value) => {
    dispatch(setPaymentMethod(value))
  }
  const handleAmountChange = (e) => {
    dispatch(setAmount(e))
  }
  const handleClick = () => {
    dispatch(toggleTable())
  }

  if (isNil(customer)) {
    return (
      <EmptyCustomer 
        table={table} 
        onClick={handleClick} 
      />
    )
  }

  return (
    <div className="d-flex flex-column p-2 gap-2">
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
      <TabsInput
        label="Payment Method"
        name="payment_method"
        options={PaymentMethodsData}  
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      />
      <TextFieldInput
        isRequired
        label="Enter Amount"
        name="address" 
        placeholder="e.g., 500.00"
        value={amount}
        onChange={handleAmountChange}
      />
      <hr className="my-2" />
      <ChooseButton 
        table={table} 
        onClick={handleClick} 
      />
    </div>
  )
}
function EmptyCustomer({table, onClick}) {
  let content = <>Press <em>&apos;Show Customers&apos;</em> to switch table.</>

  if (table == TableType.CUSTOMERS)
    content = <>Press <em>&apos;choose&apos;</em> to select a customer.</>

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h6 className="text-body-primary mb-0">No Customer</h6>
        <p className="text-body-secondary fs-7">
          {content}
        </p>
        <ChooseButton 
          table={table} 
          onClick={onClick} 
        />
      </div>
    </div>
  )
}
function ChooseButton({table, onClick}) {
  let content = (
    <Fragment>
      <BiShow className="me-1" />
      Show Customers
    </Fragment>
  )

  if (table == TableType.CUSTOMERS) {
    content = (
      <Fragment>
        <BiHide className="me-1" />
        Hide Customers
      </Fragment>
    )
  }
  
  return (
    <Button
      variant="outline-dark"
      isFullWidth={false}
      onClick={onClick}
    >
      {content}
    </Button>
  )
}


export default CustomerTab