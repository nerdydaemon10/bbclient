/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from "react"

import CreateModal from "./CreateModal.jsx"
import CustomersTable from "./CustomersTable.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import CustomersStyle from "./CustomersStyle.jsx"

function CustomersView() {
  return (
    <Fragment>
      <CustomersStyle />
      <TitleSection />
      <CustomersTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </Fragment>
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