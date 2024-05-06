/* eslint-disable react-hooks/exhaustive-deps */
import CreateModal from "./CreateModal.jsx"
import CustomersProvider from "./EmployeesProvider.jsx"
import CustomerStyle from "./CustomersStyle.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import EmployeesTable from "./EmployeesTable.jsx"

function EmployeesView() {  
  return (
    <CustomersProvider>
      <CustomerStyle />
      <TitleContainer />
      <EmployeesTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </CustomersProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Employees</h3>
      <p className="text-body-secondary mb-0">Please add some description...</p>
    </div>
  )
}


export default EmployeesView