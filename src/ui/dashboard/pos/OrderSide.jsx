import { Fragment, useEffect } from "react"
import { Button, TabsInput } from "../../common/index.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setTab } from "../../redux/posSlice.js"
import { TabsData, isIncompleteOrder } from "./Util.jsx"
import CustomerTab from "./CustomerTab.jsx"
import CheckoutsTab from "./CheckoutsTab.jsx"
import { useCreateOrderMutation } from "../../../data/services/orders.js"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"

function OrderSide() {
  const dispatch = useDispatch()
  const { tab, customer, paymentMethod, checkouts } = useSelector((state) => state.pos)
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation()

  const handleChange = (value) => {
    dispatch(setTab(value))
  }
  
  const handleOrder = (id, paymentMethod, checkouts) => {
    createOrder({
      customer_id: id,
      payment_method: paymentMethod,
      checkouts: checkouts
    })
  }
  
  useEffect(() => {
    if (!isSuccess) return
    enqueueSnackbar(GenericMessage.ORDER_ADDED)
  }, [isSuccess])

  return (
    <Fragment>
      <Tabs tab={tab} onChange={handleChange} />
      <Tab tab={tab} />
      <PlaceOrderButton
        isLoading={isLoading} 
        isDisabled={isIncompleteOrder(checkouts, customer)}
        onOrder={() => handleOrder(customer.id, paymentMethod, checkouts)}
      />
    </Fragment>
  )
}
function Tabs({tab, onChange}) {
  return (
    <div className="tabs">
      <TabsInput
        options={TabsData}
        name="tab"
        value={tab}
        onChange={onChange}
      />
    </div>
  )
}
function Tab({tab}) {
  let content = <CheckoutsTab />

  if (tab == "is-customer") 
    content = <CustomerTab />

  return (
    <div className={`tab border rounded ${tab}`}>
      {content}
    </div>
  )
}
function PlaceOrderButton({isLoading, isDisabled, onOrder}) {
  return (
    <div className="place-order-btn">
      <Button
        isLoading={isLoading}
        isDisabled={isDisabled}
        isFullWidth={true}
        onClick={onOrder}
      >
        Place Order
      </Button>   
    </div>
  )
}

export default OrderSide