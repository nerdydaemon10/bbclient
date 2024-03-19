import "boxicons"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import CreateModal from "./CreateModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import RemoveDialog from "./RemoveDialog.jsx"

import { 
  fetchProducts, 
  resetCreate, resetUpdate, resetRemove, 
  toggleCreateModal, toggleUpdateModal,  toggleRemoveModal 
} from "../../../../redux/inventory/inventorySlice.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import "./InventoryView.css"
import InventoryTitleSection from "./InventoryTitleSection.jsx"

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
      <InventoryTitleSection />
      <InventoryProductsSection />
      <CreateModal />
      <UpdateModal />
      <RemoveDialog />
    </>
  )
}

function InventoryProductsSection() {
  return (
    <>
      <InventoryFilteringSection />
      <InventoryProductsTable />
      <InventoryPaginationSection />
    </>
  )
}
const showSuccessNotification = (message) => {
  toast.success(message)
}

export default InventoryView