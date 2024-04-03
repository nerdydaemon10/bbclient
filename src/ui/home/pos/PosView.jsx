import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"

import { cleanupStatesBeforeLeave, fetchProductsAsync, searchProductsAsync, setSearchQuery } from "../../redux/pos/posSlice.jsx"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../utils/classes/AppConfig.jsx"

import AppLocalStorage from "../../../utils/AppLocalStorage.jsx"
import FilteringContainer from "./FilteringContainer.jsx"
import TableContainer from "./TableContainer.jsx"
import PaginationContainer from "./PaginationContainer.jsx"
import TabsContainer from "./TabsContainer.jsx"
import TabContainer from "./TabContainer.jsx"
import PosProvder from "./PosProvider.jsx"
import PosStyle from "./PosStyle.jsx"
import PlaceOrderBtnContainer from "./PlaceOrderBtnContainer.jsx"
import { DashboardMain } from "../Dashboard.jsx"

function PosView() {
  return (
    <PosProvder>
      <PosStyle />
      <DashboardMain>
        <TitleContainer />
        <TableWrapper />
        <CheckoutWrapper />
      </DashboardMain>
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

  const { searchQuery, productsResponse } = useSelector((state) => state.pos)
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
      name: e.target.value,
      page: 1
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