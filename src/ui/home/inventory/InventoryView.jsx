import CreateModal from "./CreateModal.jsx"
import InventoryProvider from "./InventoryProvider.jsx"
import UpdateModal from "./UpdateModal.jsx"
import { DashboardMain } from "../../home/Dashboard.jsx"
import RemoveModal from "./RemoveModal.jsx"
import ProductsTable from "./ProductsTable.jsx"
import InventoryStyle from "./InventoryStyle.jsx"
import { BiGridAlt } from "react-icons/bi"

function InventoryView() {
  return (
    <InventoryProvider>
      <InventoryStyle />
      <DashboardMain>
        <TitleContainer />
        <ProductsTable />
      </DashboardMain>
      <CreateModal />
      <UpdateModal />
      <RemoveModal />
    </InventoryProvider>
  )
}

function TitleContainer() {
  return (
    <div className="title-container">
      <h3 className="mb-0">Inventory</h3>
      <p className="mb-0">Please add some descriptions...</p>
    </div>
  )
}

/*function TableWrapper() {
  const dispatch = useDispatch()

  const { query, productsResponse } = useSelector((state) => state.inventory)
  const { isInitialize, status, data, meta, error } = productsResponse
  
  const [isSearching, setIsSearching] = useState(false)
  const handleSearchProductsAsync = debounce(query => {
    dispatch(searchProductsAsync(query))
    setIsSearching(false)
  }, AppConfig.DEBOUNCE_DELAY)

  const handleNameChange = (e) => {
    dispatch(setQuery({
      ...query,
      name: e.target.value,
      page: 1
    }))
    setIsSearching(true)
    handleSearchProductsAsync.cancel()
  }

  const handleCategoryChange = (e) => {
    dispatch(setQuery({
      ...query,
      category_id: e.target.value,
      page: 1
    }))
    setIsSearching(true)
    handleSearchProductsAsync.cancel()
  }

  const handleRowsPerPageChange = (e) => {
    dispatch(setQuery({
      ...query,
      page: 1,
      per_page: e.target.value,
    }))
    setIsSearching(true)
    handleSearchProductsAsync.cancel()
  }

  const handlePreviousClick = () => {
    dispatch(setQuery({ 
      ...query,
      page: query.page > 1 ? query.page - 1 : 1,
    }))
    setIsSearching(true)
    handleSearchProductsAsync.cancel()
  }

  const handleNextClick = () => {
    dispatch(setQuery({
      ...query,
      page: (query.page < meta.last_page) ? query.page + 1 : meta.last_page,
    }))
    setIsSearching(true)
    handleSearchProductsAsync.cancel()
  }

  useEffect(() => {
    if (!isInitialize) {
      dispatch(fetchProductsAsync())
    }
  }, [isInitialize])

  useEffect(() => {
    if (isSearching) {
      handleSearchProductsAsync(query)
    }
  }, [isSearching, query])


  useEffect(() => {
    return () => dispatch(cleanupStatesBeforeLeave())
  }, [dispatch])

  return (
    <>
      <FilteringContainer
        name={query.name}
        category={query.category_id}
        onNameChange={handleNameChange}
        onCategoryChange={handleCategoryChange}
      />
      <TableContainer
        status={status} 
        data={data} 
        error={error} 
      />
      <PaginationContainer
        status={status}
        meta={meta}
        query={query}
        onChange={handleRowsPerPageChange}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  )
}*/

export default InventoryView 