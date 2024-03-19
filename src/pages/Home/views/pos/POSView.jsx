import { debounce } from "lodash"
import { useContext, useEffect, useState } from "react"

import PosTopContainer from "./PosTopContainer.jsx"
import PosFilteringContainer from "./PosFilteringContainer.jsx"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../utils/classes/AppConfig.jsx"
import PosTableContainer from "./PosTableContainer.jsx"
import PosPaginationContainer from "./PosPaginationContainer.jsx"
import PosTabsContainer from "./PosTabsContainer.jsx"
import PosTabContainer from "./PosTabContainer.jsx"
import PosCheckoutBtn from "./PosCheckoutBtn.jsx"
import "./POSView.css"
import usePos from "./usePos.jsx"
import PosProvder, { PosContext } from "./PosProvider.jsx"

function PosView() {
  return (
    <PosProvder>
      <PosTopContainer />
      <PosStartContainer />
      <PosEndContainer />
    </PosProvder>
  )
}

function PosStartContainer() {
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
    return () => { handleSearchProducts.cancel() }
  }, [name, category, rowsPerPage, currentPage]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PosFilteringContainer 
        name={name} 
        category={category} 
        onNameChange={handleNameChange} 
        onCategoryChange={handleCategoryChange} 
      />
      <PosTableContainer 
        status={status} 
        data={data} 
        error={error} 
      />
      <PosPaginationContainer 
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

function PosEndContainer() {
  const { tabs, tab, isCheckoutBtnDisabled, handleTabChange } = useContext(PosContext)
  
  return (
    <>
      <PosTabsContainer
        tabs={tabs}
        tab={tab}
        onChange={handleTabChange}
      />
      <PosTabContainer 
        tab={tab}
      />
      <PosCheckoutBtn
        disabled={isCheckoutBtnDisabled} 
      />
    </>
  )
}

export default PosView