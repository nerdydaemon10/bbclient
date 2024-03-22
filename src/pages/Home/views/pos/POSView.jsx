import { debounce } from "lodash"
import { useEffect, useState } from "react"

import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../utils/classes/AppConfig.jsx"

import { AppDashboardMain } from "../../../../layouts/AppDashboardLayout.jsx"
import AppLocalStorage from "../../../../utils/AppLocalStorage.jsx"
import FilteringContainer from "./FilteringContainer.jsx"
import TableContainer from "./TableContainer.jsx"
import PaginationContainer from "./PaginationContainer.jsx"
import TabsContainer from "./TabsContainer.jsx"
import TabContainer from "./TabContainer.jsx"
import PosProvder from "../../../../providers/PosProvider.jsx"
import PosStyle from "./PosStyle.jsx"
import PlaceOrderBtnContainer from "./PlaceOrderBtnContainer.jsx"

function PosView() {
  return (
    <PosProvder>
      <PosStyle />
      <AppDashboardMain>
        <TitleContainer />
        <TableWrapper />
        <CheckoutWrapper />
      </AppDashboardMain>
    </PosProvder>
  )
}


function TitleContainer() {
  const user = AppLocalStorage.readUser()

  return (
    <div className="title-container">
      <h3 className="mb-0">POS System</h3>
      <p className="mb-0">Hello {user.user.full_name}, welcome back!</p>
    </div>
  )
}

function TableWrapper() {
  const dispatch = useDispatch()

  const { productsApi } = useSelector((state) => state.pos)
  const { status, data, meta, error } = productsApi

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerPages[0].id)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchProducts = debounce(() => {
    dispatch(fetchProductsAsync({
      name: name,
      category_id: category,
      per_page: rowsPerPage,
      page: currentPage
    }))
  }, AppConfig.DEBOUNCE_DELAY)

  const handleNameChange = (e) => {
    setName(e.target.value)
    handleSearchProducts.cancel()
  }
  
  const handleCategoryChange = (e) => {
    setCurrentPage(1)
    setCategory(e.target.value)
    handleSearchProducts.cancel()
  }

  const handleRowsPerPageChange = (e) => {
    setCurrentPage(1)
    setRowsPerPage(e.target.value)
    handleSearchProducts.cancel()
  }

  const handlePreviousClick = () => {
    setCurrentPage(prev => (prev > 1) ? prev - 1 : 1)
    handleSearchProducts.cancel()
  }

  const handleNextClick = () => {
    setCurrentPage(prev => (prev < meta.last_page) ? prev + 1 : meta.last_page)
    handleSearchProducts.cancel()
  }

  useEffect(() => {
    handleSearchProducts()
    return () => handleSearchProducts.cancel()
  }, [name, category, rowsPerPage, currentPage]) //eslint-disable-line react-hooks/exhaustive-deps

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

function CheckoutWrapper() {
  return (
    <>
      <TabsContainer/>
      <TabContainer />
      <PlaceOrderBtnContainer/>
    </>
  )
}

export default PosView