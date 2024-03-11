import "boxicons"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import CreateModal from "./CreateModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import RemoveDialog from "./RemoveDialog.jsx"
import ProductsTable from "./ProductsTable.jsx"
import { 
  fetchProducts, 
  resetCreate, resetUpdate, resetRemove, 
  toggleCreateModal, toggleUpdateModal,  toggleRemoveModal 
} from "../../../../redux/inventory/inventorySlice.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"

function InventoryView() {
  // redux-state
  const { fetch, create, update, remove } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()

  if (fetch.status == UiStatus.LOADING) {
    dispatch(fetchProducts())
  }
  
  useEffect(() => {
    if (fetch.status == UiStatus.LOADING) {
      dispatch(fetchProducts())
    }
  }, [fetch.status, dispatch])

  useEffect(() => {
    if (create.status == UiStatus.SUCCESS) {
      dispatch(toggleCreateModal(false))
      showSuccessNotification(create.message)

      setTimeout(() => {
        dispatch(resetCreate())
      }, 500)
    }
  }, [create.status, create.message, dispatch])

  useEffect(() => {
    if (update.status == UiStatus.SUCCESS) {
      dispatch(toggleUpdateModal(false))
      showSuccessNotification(update.message)

      setTimeout(() => {
        dispatch(resetUpdate())
      }, 500)
    }
  }, [update.status, update.message, dispatch])

  useEffect(() => {
    if (remove.status == UiStatus.SUCCESS) {
      dispatch(toggleRemoveModal(false))
      showSuccessNotification(remove.message)

      setTimeout(() => {
        dispatch(resetRemove())
      }, 500)
    }
  }, [remove.status, remove.message, dispatch])

  return (
    <>
      <header>
        <h3 className="mb-0">Inventory</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </header>
      <ProductsTable />
      <CreateModal />
      <UpdateModal />
      <RemoveDialog />
    </>
  )
}

const showSuccessNotification = (message) => {
  toast.success(message)
}

export default InventoryView