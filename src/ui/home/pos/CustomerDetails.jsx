import { useDispatch } from "react-redux"
import SecondaryButton from "../../common/buttons/SecondaryButton.jsx"
import { toggleIsProductsSelected } from "../../redux/posSlice.jsx"
import { FormTextFieldInput } from "../../common/index.jsx"
import { findErrorByName } from "../../../utils/Helper.jsx"

function CustomerDetails({isProductsSelected, customer}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleIsProductsSelected())  
  }

  return (
    <div className={`customer-details ${customer ? "" : "is-empty"}`}>
      {
        customer ? (
          <Customer 
            isProductsSelected={isProductsSelected} 
            customer={customer} 
            onClick={handleClick}
          />
        ) : (
          <CustomerEmpty 
            isProductsSelected={isProductsSelected}
            onClick={handleClick} 
          />
        )
      }
    </div>
  )
}

function Customer({isProductsSelected, customer, onClick}) {
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
      <hr />
      <ChooseButton 
        isProductsSelected={isProductsSelected} 
        onClick={onClick} 
      />
    </div>
  )
}

function CustomerEmpty({isProductsSelected, onClick}) {
  return (
    <div>
      <h6 className="mb-0">No Customer</h6>
      <p>Press &apos;choose&apos; to select a customer.</p>
      <ChooseButton 
        isProductsSelected={isProductsSelected} 
        onClick={onClick}
      />
    </div>
  )
}

function ChooseButton({isProductsSelected, onClick}) {
  return (
    <SecondaryButton 
      isFullWidth={true}
      onClick={onClick}
    >
      {isProductsSelected ? "Choose Customer" : "Cancel Customer" }
    </SecondaryButton>
  )
}

export default CustomerDetails