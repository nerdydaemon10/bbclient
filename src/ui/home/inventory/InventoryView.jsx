import CreateModal from "./CreateModal.jsx"
import InventoryProvider from "./InventoryProvider.jsx"
import UpdateModal from "./UpdateModal.jsx"
import RemoveModal from "./RemoveModal.jsx"
import ProductsTable from "./ProductsTable.jsx"
import InventoryStyle from "./InventoryStyle.jsx"

function InventoryView() {
  return (
    <InventoryProvider>
      <InventoryStyle />
      <TitleContainer />
      <ProductsTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </InventoryProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="mb-0">Inventory</h3>
      <p className="mb-0">Please add some descriptions...</p>
    </div>
  )
}

export default InventoryView 