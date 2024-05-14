import CreateModal from "./CreateModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import RemoveModal from "./RemoveModal.jsx"
import ProductsTable from "./ProductsTable.jsx"
import InventoryStyle from "./InventoryStyle.jsx"
import { Fragment } from "react"

function InventoryView() {
  return (
    <Fragment>
      <InventoryStyle />
      <TitleSection />
      <ProductsTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </Fragment>
  )
}

function TitleSection() {
  return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Inventory</h3>
      <p className="text-body-secondary mb-0">View list of products in inventory</p>
    </div>
  )
}

export default InventoryView 