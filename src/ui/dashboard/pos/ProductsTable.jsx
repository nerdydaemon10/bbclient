import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { Tabs, isCheckedOut, productCols } from "./Util.jsx"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { productCategories, rowsPerPages } from "../../../util/Config.jsx"
import { noSearchResults } from "../../../util/helper.jsx"
import { Button, SearchFieldInput, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { addToCheckout, setSearchQuery, setTab } from "../../redux/posSlice.js"
import { PosContext } from "./PosProvider.jsx"
import { first, isEmpty, size } from "lodash"

function ProductsTable() {
  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.pos)
  const { searchQuery, fetchResponse } = products
  const { isLoading, data, meta, error } = fetchResponse

  const { searchProducts } = useContext(PosContext)

  const handleChange = (e) => {
    dispatch(setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value, page: 1 }))
    searchProducts.cancel()
  }
  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    searchProducts.cancel()
  }
  const handleNext = () => {
    let page = searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    searchProducts.cancel()
  }

  return (
    <>
      <FilteringContainer
        name={searchQuery.name}
        status={searchQuery.status}
        onChange={handleChange}
      />
      <TableContainer 
        isLoading={isLoading} 
        searchQuery={searchQuery}
        data={data}
        error={error}
      />
      <PaginationContainer
        rowsPerPage={searchQuery.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        isLoading={isLoading}
        onChange={handleChange} 
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
function FilteringContainer({name, category, onChange}) {
  return (
    <div className="filtering-container is-products-table">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="name"
            placeholder="Search by Product..."
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <SelectInput
            name="category_id"
            options={productCategories}
            isOptional
            value={category}
            onChange={onChange}
            onRender={(option) => ProductCategory.toCategory(option)}
          />
        </div>
      </div>
    </div>
  )
}
function TableContainer({isLoading, searchQuery, data, error}) {
  const { tab, checkouts } = useSelector(state => state.pos)

  const dispatch = useDispatch()
  
  const firstTab = first(Tabs).value
  const colSpan = size(productCols)

  const handleClick = (product) => {
    dispatch(addToCheckout(product))

    if (tab != firstTab)
      dispatch(setTab(firstTab))
  }

  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={productCols}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.PRODUCTS_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={colSpan}>
                {error.message ? error.message : GenericMessage.PRODUCTS_ERROR}
              </TDStatus>
            ) : noSearchResults(searchQuery, data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.PRODUCTS_NO_MATCH}
              </TDStatus>
            ) : isEmpty(data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.PRODUCTS_EMPTY}
              </TDStatus>
            ) : data ? data.map((product, index) => (
              <TDProduct
                key={index}
                product={product}
                isCheckedOut={isCheckedOut(checkouts, product.id)}
                onClick={() => handleClick(product)}
              />
            )) : (
              <></>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

function TDProduct({product, isCheckedOut, onClick}) {
  const name = StringHelper.truncate(product.name)
  const description = StringHelper.truncate(product.description)
  const category = ProductCategory.toCategory(product.category_id)
  const stocks = StringHelper.toStocks(product.quantity)
  const price = StringHelper.toPesoCurrency(product.srp)
  
  return (
    <tr key={product.id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <span className="badge text-bg-light">
          {category}
        </span>
      </td>
      <td>{stocks}</td>
      <td>{price}</td>
      <td>
        <Button
          size="sm"
          isDisabled={isCheckedOut}
          onClick={onClick}
        >
          Checkout
        </Button>
      </td>
    </tr>
  )
}
function PaginationContainer({rowsPerPage, currentPage, lastPage, isLoading, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">Rows per page</label>
        <SelectInput
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">{`Page ${currentPage} of ${lastPage}`}</label>
        <div className="btn-group">
          <Button
            variant="light" 
            isDisabled={isLoading || currentPage <= 1}
            onClick={onPrevious}
          >
            Prev
          </Button>
          <Button 
            variant="light" 
            isDisabled={isLoading || currentPage >= lastPage} 
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductsTable