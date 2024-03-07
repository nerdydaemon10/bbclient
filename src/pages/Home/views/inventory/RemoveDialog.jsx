import { useDispatch, useSelector } from "react-redux"

import { removeProduct, toggleRemoveModal } from "../../../../redux/inventory/inventorySlice.jsx"
import AppFormDialog from "../../../../components/forms/AppFormDialog.jsx"

function RemoveDialog() {
  const dispatch = useDispatch()
  const { remove, product, isRemoveModalOpen } = useSelector((state) => state.inventory)
  
  const handleClose = () => {
    dispatch(toggleRemoveModal(false))
  }

  const handleConfirm = (e) => { 
    e.preventDefault()
    dispatch(removeProduct(product))
  }

  if (!product) {
    return <></>
  }
  
  return (
    <AppFormDialog 
      title="Remove Product"
      status={remove.status}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      Do you want to remove <span className="badge bg-secondary">{product.name}</span> from the inventory?
    </AppFormDialog>
  )
}

export default RemoveDialog