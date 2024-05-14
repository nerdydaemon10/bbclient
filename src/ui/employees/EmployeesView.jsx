/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from "react"

import CreateModal from "./CreateModal.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import EmployeesTable from "./EmployeesTable.jsx"
import EmployeesStyle from "./EmployeesStyle.jsx"

function EmployeesView() {  
  return (
    <Fragment>
      <EmployeesStyle />
      <TitleSection />
      <EmployeesTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </Fragment>
  )
}
function TitleSection() {
  return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Employees</h3>
      <p className="text-body-secondary mb-0">Please add some description...</p>
    </div>
  )
}


export default EmployeesView