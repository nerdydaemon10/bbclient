import "boxicons"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import CreateModal from "./CreateModal.jsx"
import ProductsTable from "./ProductsTable.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import { fetchProducts, toggleCreateModal, toggleRemoveModal } from "../../../../redux/inventory/inventorySlice.jsx"
import RemoveDialog from "./RemoveDialog.jsx"
import UpdateModal from "./UpdateModal.jsx"

function InventoryView() {
  // redux-state
  const { fetch, create, update, remove } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (fetch.status == UiStatus.LOADING) {
      dispatch(fetchProducts())
    }
  }, [fetch.status, dispatch])

  useEffect(() => {
    if (create.status == UiStatus.SUCCESS) {
      dispatch(toggleCreateModal(false))
      showNotification("test")
    }
  }, [create.status, dispatch])

  /*useEffect(() => {
    if (remove.status == UiStatus.SUCCESS) {
      dispatch(toggleUpdateModal(false))
      showNotification(update.message)
    }
  }, [remove.status,  remove.message, dispatch])*/

  return (
    <div>
      <h3 className="mb-0">Inventory</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <ProductsTable />
      <CreateModal />
      <UpdateModal />
      <RemoveDialog />
      <Toaster />
    </div>
  )
}

const showNotification = (message) => {
  toast.success(message)
}

export default InventoryView