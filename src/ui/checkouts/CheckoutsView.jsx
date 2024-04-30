/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { ReceiptList } from "../common/index.jsx"
import CheckoutDetails from "./CheckoutDetails.jsx"
import CheckoutsStyle from "./CheckoutsStyle.jsx"
import CheckoutsTable from "./CheckoutsTable.jsx"
import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function CheckoutsView() {
  const navigate = useNavigate()
  const { order } = useSelector((state) => state.checkouts)

  useEffect(() => {
    if (isEmpty(order)) 
      navigate("..")
  }, [order])

  return (
    <>
      <CheckoutsStyle />
      <TitleContainer />
      <CheckoutsTable />
      <CheckoutDetails />
      <ReceiptList
        receipts={[
          { name: "Salesp. Commission", value: 50},
          { name: "Total Items", value: 50},
          { name: "Amount Due", value: 50},
        ]}
      />
    </>  
  )
}

function TitleContainer() {
   return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Checkouts</h3>
      <p className="text-body-secondary fw-normal mb-0">Summary of ordered products</p>
    </div>
  )
}

export default CheckoutsView 