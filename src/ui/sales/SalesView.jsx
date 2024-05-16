/* eslint-disable react-hooks/exhaustive-deps */
import SalesStyle from "./SalesStyle.jsx"
import SalesTable from "./SalesTable.jsx"
import { ReceiptList } from "../common/index.jsx"
import { useSelector } from "react-redux"
import { selectReceipts, selectTotalCommission, selectTotalSales } from "../redux/salesSlice.js"
import { hasSelectedUser } from "./Util.jsx"
import SalesProvider from "./SalesProvider.jsx"
import { toPeso } from "../../util/helper.js"
import SalesSide from "./SalesSide.jsx"

function SalesView() {
  const { sq } = useSelector((state) => state.sales)
  const receipts = useSelector(selectReceipts)
  const totalCommission = useSelector((state) => selectTotalCommission(state.sales))
  const totalSales = useSelector((state) => selectTotalSales(state.sales))

  /*
  <ReceiptList 
    receipts={[
      hasSelectedUser(sq) && { name: "Salesp. Commission", value: toPeso(totalCommission)},
      { name: "Overall Total", value: toPeso(totalSales)}
    ]}
  />
  */

  return (
    <SalesProvider>
      <SalesStyle />
      <TitleSection />
      <SalesTable />
      <SalesSide />
      <ReceiptList receipts={receipts} />
    </SalesProvider>
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