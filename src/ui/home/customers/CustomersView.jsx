import { BiGridAlt } from "react-icons/bi"
import { DashboardMain } from "../Dashboard.jsx"
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
      <DashboardMain>
        <TitleContainer />
        <CustomersTable />
      </DashboardMain>
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </CustomersProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="mb-0">Customers</h3>
      <p className="mb-0">Please add some description...</p>
    </div>
  )
}


export default CustomersView