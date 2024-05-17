/* eslint-disable react-hooks/exhaustive-deps */
import SalesStyle from "./SalesStyle.jsx"
import SalesTable from "./SalesTable.jsx"
import { ReceiptList } from "../common/index.jsx"
import { useSelector } from "react-redux"
import { selectReceipts } from "../redux/salesSlice.js"
import SalesSide from "./SalesSide.jsx"
import { Fragment } from "react"

function SalesView() {
  const receipts = useSelector(selectReceipts)

  return (
    <Fragment>
      <SalesStyle />
      <TitleSection />
      <SalesTable />
      <SalesSide />
      <ReceiptList receipts={receipts} />
    </Fragment>
  )
}

function TitleSection() {
   return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Sales Report</h3>
      <p className="text-body-secondary fw-normal mb-0">View list of sales and commissions</p>
    </div>
  )
}

export default SalesView 