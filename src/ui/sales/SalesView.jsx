/* eslint-disable react-hooks/exhaustive-deps */
import FilteringContainer from "./FilteringContainer.jsx"
import SalesProvider from "./SalesProvider.jsx"
import SalesStyle from "./SalesStyle.jsx"
import SalesTable from "./SalesTable.jsx"
import { ReceiptList } from "../common/index.jsx"
import { useSelector } from "react-redux"
import { selectTotalCommission, selectTotalSales } from "../redux/salesSlice.js"

function SalesView() {
  const totalCommission = useSelector((state) => selectTotalCommission(state.sales))
  const totalSales = useSelector((state) => selectTotalSales(state.sales))

  return (
    <SalesProvider>
      <SalesStyle />
      <TitleContainer />
      <SalesTable />
      <FilteringContainer />
      <ReceiptList 
        receipts={[
          { name: "Salesp. Commission", value: totalCommission},
          { name: "Total", value: totalSales},
        ]}
      />
    </SalesProvider>  
  )
}

function TitleContainer() {
   return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Sales Report</h3>
      <p className="text-body-secondary fw-normal mb-0">View list of sales and commissions</p>
    </div>
  )
}

export default SalesView 