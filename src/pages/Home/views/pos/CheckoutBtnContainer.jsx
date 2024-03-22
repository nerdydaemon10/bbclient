import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"

function CheckoutBtnContainer({disabled}) {
  return (
    <div className="checkout-btn-container">
      <AppPrimaryButton 
        text="Checkout"
        fullWidth={true}
        disabled={disabled}
      />
    </div>
  )
}

export default CheckoutBtnContainer