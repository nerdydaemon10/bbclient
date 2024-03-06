import "boxicons"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux"

import ProductsTable from "./ProductsTable.jsx"
import AppModal from "../../../../components/modals/AppModal.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import AppFormSelect from "../../../../components/forms/AppFormSelect.jsx"
import { createProduct, fetchProducts } from "../../../../redux/inventory/inventorySlice.jsx"
import { findErrorByName } from "../../../../utils/helpers/FormHelper.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"

function InventoryView() {
  // local-state
  const [isCreateModalShown, setIsCreateModalShown] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category_id: ProductCategories[1].id,
    quantity: "",
    srp: "",
    member_price: ""
  })
  
  // redux-state
  const { create } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (create.status == UiStatus.SUCCESS) {
      setIsCreateModalShown(false)
      notify()
    }
  }, [create.status])

  const notify = () => {
    toast.success("Product was successfully added.")
  }
  
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value})
  }

  const handleCreateModalShownClick = () => {
    setIsCreateModalShown(!isCreateModalShown)
  }

  const handleCreateModalCloseClick = () => {
    setIsCreateModalShown(!isCreateModalShown)
  }

  const handleCreateModalConfirmClick = (e) => {
    e.preventDefault()
    dispatch(createProduct(product))
  }

  return (
    <>
      <h3 className="mb-0">Inventory</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <ProductsTable onCreateModalShownClick={handleCreateModalShownClick} />
      <AppModal 
        title="Create Product"
        caption="Add new product to the inventory"
        status={create.status}
        isShown={isCreateModalShown} 
        onClose={handleCreateModalCloseClick}
        onConfirm={handleCreateModalConfirmClick}
      >
        <div className="row mb-2">
          <div className="col-6">
            <AppFormTextField 
              name="name"
              label="Name"
              placeholder="e.g., Coffee Power"
              value={product.name}
              error={findErrorByName(create.error, "name")}
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
              name="description"
              label="Description"
              placeholder="e.g., 100 grams, with free spoon"
              value={product.description}
              error={findErrorByName(create.error, "description")}
              onChange={handleProductChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">
            <AppFormSelect 
              name="category_id"
              label="Category"
              options={ProductCategories}
              value={product.category_id}
              error={findErrorByName(create.error, "category_id")}
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
                name="quantity"
                label="Quantity"
                placeholder="e.g., 75"
                value={product.quantity}
                error={findErrorByName(create.error, "quantity")}
                onChange={handleProductChange}
              />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">
            <AppFormTextField 
              name="srp"
              label="SRP"
              placeholder="e.g., 80.00"
              value={product.srp}
              error={findErrorByName(create.error, "srp")}
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
              name="member_price"
              label="Member Price"
              placeholder="e.g., 90.00"
              value={product.member_price}
              error={findErrorByName(create.error, "member_price")}
              onChange={handleProductChange}
            />
          </div>
        </div>
      </AppModal>
      <Toaster />
    </>
  )
}

export default InventoryView