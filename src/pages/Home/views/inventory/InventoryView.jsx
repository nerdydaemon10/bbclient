import "./InventoryView.css"
import InventoryFilteringContainer from "./InventoryFilteringContainer.jsx"
import InventoryTopContainer from "./InventoryTopContainer.jsx"

function InventoryView() {
  return (
    <>
      <InventoryTopContainer />
      <InventoryMainContainer />
    </>
  )
}

function InventoryMainContainer() {
  return (
    <>
      <InventoryFilteringContainer />
    </>
  )
}

export default InventoryView