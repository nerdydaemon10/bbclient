/* eslint-disable react-hooks/exhaustive-deps */
import SalesStyle from "./SalesStyle.jsx"
import SalesTable from "./SalesTable.jsx"
import { ReceiptList } from "../common/index.jsx"
import { useSelector } from "react-redux"
import { selectTotalCommission, selectTotalSales } from "../redux/salesSlice.js"
import SideContainer from "./SideContainer.jsx"
import StringHelper from "../../util/helpers/StringHelper.js"
import { hasSelectedUser } from "./Util.jsx"
import SalesProvider from "./SalesProvider.jsx"

function SalesView() {
  const { sq } = useSelector((state) => state.sales)
  const totalCommission = useSelector((state) => selectTotalCommission(state.sales))
  const totalSales = useSelector((state) => selectTotalSales(state.sales))

  return (
    <SalesProvider>
      <SalesStyle />
      <TitleContainer />
      <SalesTable />
      <SideContainer />
      <ReceiptList 
        receipts={[
          hasSelectedUser(sq) && { name: "Salesp. Commission", value: StringHelper.toPesoCurrency(totalCommission)},
          { name: "Total", value: StringHelper.toPesoCurrency(totalSales)}
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