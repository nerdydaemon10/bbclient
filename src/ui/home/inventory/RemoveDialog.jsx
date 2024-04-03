import { useDispatch, useSelector } from "react-redux"
import { fetchProductsAsync, removeProductAsync } from "../../redux/inventory/inventorySlice.jsx"
import AppFormDialog from "../../components/forms/AppFormDialog.jsx"
import { useContext, useEffect } from "react"
import InventoryContext from "./InventoryContext.jsx"
import UiStatus from "../../../utils/classes/UiStatus.jsx"
import { enqueueSnackbar } from "notistack"

function RemoveDialog() {
  const dispatch = useDispatch()

  const { removeProductResponse } = useSelector((state) => state.inventory)
  const { status, message } = removeProductResponse
  const { isRemoveDialogOpen, setIsRemoveDialogOpen, product } = useContext(InventoryContext)

  const handleClose = () => {
    setIsRemoveDialogOpen(false)
  }

  const handleConfirm = (e) => { 
    e.preventDefault()
    dispatch(removeProductAsync(product.id))
  }

  useEffect(() => {
    if (status == UiStatus.SUCCESS) {
      setIsRemoveDialogOpen(false)
      enqueueSnackbar(message)

      dispatch(fetchProductsAsync())
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) {
    return <></>
  }
  
  return (
    <AppFormDialog 
      title="Remove Product"
      status={status}
      isOpen={isRemoveDialogOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      Do you want to remove <span className="badge bg-secondary">{product.name}</span> from the inventory?
    </AppFormDialog>
  )
}

export default RemoveDialog