import "boxicons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ProductsTable from "./ProductsTable.jsx"
import AppModal from "../../../../components/modals/AppModal.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import AppFormSelect from "../../../../components/forms/AppFormSelect.jsx"
import { createProduct, fetchProducts } from "../../../../redux/inventory/inventorySlice.jsx"


function InventoryView() {
  // local-state
  const [isCreateModalShown, setIsCreateModalShown] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: ProductCategories[1].id,
    quantity: "",
    srp: "",
    memberPrice: ""
  })

  // redux-state
  const { fetch, create } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

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
        <div className="row mb-1">
          <div className="col-6">
            <AppFormTextField 
              name="name"
              label="Name"
              placeholder="e.g., Coffee Power"
              value={product.name}
              error=""
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
              name="description"
              label="Description"
              placeholder="e.g., 100 grams, with free spoon"
              value={product.description}
              error=""
              onChange={handleProductChange}
            />
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-6">
            <AppFormSelect 
              name="categoryId"
              label="Category"
              options={ProductCategories}
              value={product.categoryId}
              error=""
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
                name="quantity"
                label="Quantity"
                placeholder="e.g., 75"
                value={product.quantity}
                error=""
                onChange={handleProductChange}
              />
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-6">
            <AppFormTextField 
              name="srp"
              label="SRP"
              placeholder="e.g., 80.00"
              value={product.srp}
              error=""
              onChange={handleProductChange}
            />
          </div>
          <div className="col-6">
            <AppFormTextField 
              name="memberPrice"
              label="Member Price"
              placeholder="e.g., 90.00"
              value={product.memberPrice}
              error=""
              onChange={handleProductChange}
            />
          </div>
        </div>
      </AppModal>
    </>
  )
}

export default InventoryView