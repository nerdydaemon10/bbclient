/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import CreateModal from "./CreateModal.jsx"
import CustomerStyle from "./CustomersStyle.jsx"
import CustomersTable from "./CustomersTable.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"

function CustomersView() {  
  return (
    <React.Fragment>
      <CustomerStyle />
      <TitleSection />
      <CustomersTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </React.Fragment>
  )
}

function TitleSection() {
  return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Customers</h3>
      <p className="text-body-secondary mb-0">Please add some description...</p>
    </div>
  )
}


export default CustomersView