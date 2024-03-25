import { useDispatch, useSelector } from "react-redux"
import { AppDashboardMain } from "../../../../layouts/AppDashboardLayout.jsx"
import FilteringContainer from "./FilteringContainer.jsx"
import PaginationContainer from "./PaginationContainer.jsx"
import TableContainer from "./TableContainer.jsx"

import { cleanupStatesBeforeLeave, fetchProductsAsync, searchProductsAsync, setSearchQuery } from "../../../../redux/inventory/inventorySlice.jsx"
import CreateModal from "./CreateModal.jsx"
import styles from "./styles.module.css"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"
import AppConfig from "../../../../utils/classes/AppConfig.jsx"
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

  const { searchQuery, productsResponse } = useSelector((state) => state.inventory)
  const { isInitialize, status, data, meta, error } = productsResponse
  
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchProductsAsync = debounce(query => {
    dispatch(searchProductsAsync(query))
    setIsSearching(false)
  }, AppConfig.DEBOUNCE_DELAY)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchProductsCallback = useCallback(handleSearchProductsAsync, []) 
  const handleNameChange = (e) => {
    dispatch(setSearchQuery({
      ...searchQuery,
      name: e.target.value
    }))
    setIsSearching(true)
  }
  
  const handleCategoryChange = (e) => {
    dispatch(setSearchQuery({ 
      ...searchQuery,
      category_id: e.target.value,
      page: 1
    }))
    setIsSearching(true)
  }

  const handleRowsPerPageChange = (e) => {
    dispatch(setSearchQuery({
      ...searchQuery,
      page: 1,
      per_page: e.target.value,
    }))
    setIsSearching(true)
  }

  const handlePreviousClick = () => {
    dispatch(setSearchQuery({ 
      ...searchQuery,
      page: searchQuery.page > 1 ? searchQuery.page - 1 : 1,
    }))
    setIsSearching(true)
  }

  const handleNextClick = () => {
    dispatch(setSearchQuery({ 
      ...searchQuery,
      page: (searchQuery.page < meta.last_page) ? searchQuery.page + 1 : meta.last_page,
    }))
    setIsSearching(true)
  }

  useEffect(() => {
    if (!isInitialize) {
      dispatch(fetchProductsAsync())
    }
  }, [isInitialize, dispatch])

  useEffect(() => {
    if (isSearching) {
      searchProductsCallback(searchQuery)
    }
  }, [isSearching, searchProductsCallback, searchQuery])

  useEffect(() => {
    return () => dispatch(cleanupStatesBeforeLeave())
  }, [dispatch])

  return (
    <>
      <FilteringContainer
        name={searchQuery.name}
        category={searchQuery.category_id}
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
        currentPage={searchQuery.page}
        rowsPerPage={searchQuery.per_page}
        onChange={handleRowsPerPageChange}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  )
}

export default InventoryView 