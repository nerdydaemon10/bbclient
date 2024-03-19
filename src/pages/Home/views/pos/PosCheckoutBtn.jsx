import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"

function PosCheckoutBtn({checkouts, customer}) {
  const disabled = checkouts.length == 0 || (
    customer.name.length == 0 || 
    customer.contactNumber.length == 0 || 
    customer.deliveryAddress.length == 0
  )

  return (
    <div className="pos-checkout-btn">
      <AppPrimaryButton 
        text="Checkout"
        fullWidth={true}
        disabled={disabled}
      />
    </div>
  )
}

export default PosCheckoutBtn