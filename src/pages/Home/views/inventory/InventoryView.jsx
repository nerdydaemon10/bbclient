import "boxicons"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import CreateModal from "./CreateModal.jsx"
import ProductsTable from "./ProductsTable.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import { fetchProducts, toggleCreateModal } from "../../../../redux/inventory/inventorySlice.jsx"

function InventoryView() {
  // redux-state
  const { create } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (create.status == UiStatus.SUCCESS) {
      dispatch(toggleCreateModal(false))
      showNotification()
    }
  }, [create.status, dispatch])
  
  return (
    <div>
      <h3 className="mb-0">Inventory</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <ProductsTable />
      <CreateModal />
      <Toaster />
    </div>
  )
}

const showNotification = () => {
  toast.success("Product was successfully added.")
}

export default InventoryView