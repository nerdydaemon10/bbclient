/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import FilteringContainer from "./FilteringContainer.jsx"
import SalesProvider from "./SalesProvider.jsx"
import SalesStyle from "./SalesStyle.jsx"
import SalesTable from "./SalesTable.jsx"
import { useDispatch } from "react-redux"
import { setBreadcrumb } from "../redux/dashboardSlice.js"
import TotalContainer from "./TotalContainer.jsx"

function SalesView() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBreadcrumb([
      { name: "Sales Report", route: "pos", active: true }
    ]))
  }, [])

  return (
    <SalesProvider>
      <SalesStyle />
      <TitleContainer />
      <SalesTable />
      <FilteringContainer />
      <TotalContainer />
    </SalesProvider>  
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="mb-0">Sales Report</h3>
      <p className="mb-0">Please add some descriptions...</p>
    </div>
  )
}

export default SalesView 