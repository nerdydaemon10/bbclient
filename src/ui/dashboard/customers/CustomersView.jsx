/* eslint-disable react-hooks/exhaustive-deps */
import CreateModal from "./CreateModal.jsx"
import CustomersProvider from "./CustomersProvider.jsx"
import CustomerStyle from "./CustomersStyle.jsx"
import CustomersTable from "./CustomersTable.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"

function CustomersView() {  
  return (
    <CustomersProvider>
      <CustomerStyle />
      <TitleContainer />
      <CustomersTable />
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </CustomersProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Customers</h3>
      <p className="text-body-secondary mb-0">Please add some description...</p>
    </div>
  )
}


export default CustomersView