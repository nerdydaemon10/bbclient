import PosTitleSection from "./PosTitleSection.jsx"

import "./PosView.css"
import PosProductsTable from "./PosProductsTable.jsx"

function PosView() {
  return (
    <>
      <PosTitleSection />
      <PosProductsTable />
      <PosOrdersSection />
    </>
  )
}

function PosOrdersSection() {
  return (
    <div className="pos-orders-section">
    </div>
  )
}

export default PosView