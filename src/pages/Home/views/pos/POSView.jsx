import PosTitleSection from "./PosTitleSection.jsx"

import PosFilteringSection from "./PosFilteringSection.jsx"
import PosPaginationSection from "./PosPaginationSection.jsx"

import "./PosView.css"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import PosProductsTable from "./PosProductsTable.jsx"

function PosView() {
  const dispatch = useDispatch()

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