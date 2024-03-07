import { useDispatch, useSelector } from "react-redux"
import AppFormModal from "../../../../components/forms/AppFormModal.jsx"
import AppFormSelect from "../../../../components/forms/AppFormSelect.jsx"
import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { findErrorByName } from "../../../../utils/helpers/FormHelper.jsx"
import { changeProduct, createProduct, toggleCreateModal } from "../../../../redux/inventory/inventorySlice.jsx"

function CreateModal() {
  const { create, product, isCreateModalOpen } = useSelector((state) => state.inventory)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(changeProduct({ ...product, [e.target.name]: e.target.value}))
  }

  const handleClose = () => {
    dispatch(toggleCreateModal(false))
  }

  const handleConfirm = (e) => {
    e.preventDeafult()
    dispatch(createProduct(product))
  }
  
  return (
    <AppFormModal 
      title="Create Product"
      status={create.status}
      open={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <AppFormTextField 
            name="name"
            label="Name"
            placeholder="e.g., Coffee Power"
            value={product.name}
            error={findErrorByName(create.error, "name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="description"
            label="Description"
            placeholder="e.g., 100 grams, with free spoon"
            value={product.description}
            error={findErrorByName(create.error, "description")}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
              name="quantity"
              label="Quantity"
              placeholder="e.g., 75"
              value={product.quantity}
              error={findErrorByName(create.error, "quantity")}
              onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="member_price"
            label="Member Price"
            placeholder="e.g., 90.00"
            value={product.member_price}
            error={findErrorByName(create.error, "member_price")}
            onChange={handleChange}
          />
        </div>
      </div>
    </AppFormModal>
  )
}

export default CreateModal