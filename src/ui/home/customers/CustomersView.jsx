/* eslint-disable react-hooks/exhaustive-deps */
import CreateModal from "./CreateModal.jsx"
import CustomersProvider from "./CustomersProvider.jsx"
import CustomerStyle from "./CustomersStyle.jsx"
import CustomersTable from "./CustomersTable.jsx"
import RemoveModal from "./RemoveModal.jsx"
import UpdateModal from "./UpdateModal.jsx"
import { useEffect } from "react"
import { setBreadcrumb } from "../../redux/dashboardSlice.js"
import { useDispatch } from "react-redux"
import { breadcrumbItems } from "./Util.jsx"

function CustomersView() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems))
  }, [])
  
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