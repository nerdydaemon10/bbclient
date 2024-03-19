import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"

function PosCheckoutBtn({disabled}) {
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