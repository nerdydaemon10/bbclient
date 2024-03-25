import { useDispatch, useSelector } from "react-redux"
import { AppDashboardMain } from "../../../../layouts/AppDashboardLayout.jsx"
import FilteringContainer from "./FilteringContainer.jsx"
import PaginationContainer from "./PaginationContainer.jsx"
import TableContainer from "./TableContainer.jsx"

import { fetchProductsAsync, searchProductsAsync } from "../../../../redux/inventory/inventorySlice.jsx"
import CreateModal from "./CreateModal.jsx"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import { debounce } from "lodash"
import AppConfig from "../../../../utils/classes/AppConfig.jsx"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import InventoryProvider from "../../../../providers/InventoryProvider.jsx"
import RemoveDialog from "./RemoveDialog.jsx"
import UpdateModal from "./UpdateModal.jsx"

function InventoryView() {  
  return (
    <InventoryProvider>
      <AppDashboardMain className={styles.appDashboardMain}>
        <TitleContainer />
        <TableWrapper />
      </AppDashboardMain>
      <CreateModal />
      <RemoveDialog />
      <UpdateModal />
    </InventoryProvider>
  )
}

function TitleContainer() {
  return (
    <div className="pos-top-container">
      <h3 className="mb-0">Inventory</h3>
      <p className="mb-0">Please add some descriptions...</p>
    </div>
  )
}

function TableWrapper() {
  const dispatch = useDispatch()

  const { productsResponse } = useSelector((state) => state.inventory)
  const { status, data, meta, error } = productsResponse

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerPages[0].id)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchProductsAsync = debounce(() => {
    dispatch(searchProductsAsync({
      name: name,
      category_id: category,
      per_page: rowsPerPage,
      page: currentPage
    }))
  }, AppConfig.DEBOUNCE_DELAY)

  const handleNameChange = (e) => {
    setName(e.target.value)
    handleSearchProductsAsync.cancel()
  }
  
  const handleCategoryChange = (e) => {
    setCurrentPage(1)
    setCategory(e.target.value)
    handleSearchProductsAsync.cancel()
  }

  const handleRowsPerPageChange = (e) => {
    setCurrentPage(1)
    setRowsPerPage(e.target.value)
    handleSearchProductsAsync.cancel()
  }

  const handlePreviousClick = () => {
    setCurrentPage(prev => (prev > 1) ? prev - 1 : 1)
    handleSearchProductsAsync.cancel()
  }

  const handleNextClick = () => {
    setCurrentPage(prev => (prev < meta.last_page) ? prev + 1 : meta.last_page)
    handleSearchProductsAsync.cancel()
  }

  // fetching
  useEffect(() => {
    if (status == UiStatus.FETCHING) {
      console.log("fetching")
      dispatch(fetchProductsAsync())
    }
  }, [status]) //eslint-disable-line react-hooks/exhaustive-deps

  // searching
  useEffect(() => {
    if (status != UiStatus.FETCHING) {
      console.log("searching")
      handleSearchProductsAsync()
    }
  }, [name, category, rowsPerPage, currentPage]) //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => handleSearchProductsAsync.cancel()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      <FilteringContainer
        name={name}
        category={category}
        onNameChange={handleNameChange}
        onCategoryChange={handleCategoryChange}
      />
      <TableContainer
        status={status} 
        data={data} 
        error={error} 
      />
      <PaginationContainer
        meta={meta}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onChange={handleRowsPerPageChange}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  )
}

export default InventoryView 