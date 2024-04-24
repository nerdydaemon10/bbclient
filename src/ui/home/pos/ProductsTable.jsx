import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { isCheckedOut, productCols } from "./Util.jsx"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { ProductCategoriesData, productCategories, rowsPerPages } from "../../../util/Config.jsx"
import { isItemsEmpty, isSearchResultsEmpty } from "../../../util/helper.jsx"
import { PrimaryButton, SearchFieldInput, SecondaryButton, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import ProductCategory from "../../../util/classes/ProductCategory.jsx"
import { addToCheckout, setSearchQuery } from "../../redux/posSlice.js"
import { PosContext } from "./PosProvider.jsx"
import { size } from "lodash"

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
            isAllCategoriesEnabled
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
  const dispatch = useDispatch()

  const { checkouts } = useSelector(state => state.pos)

  const colSpan = size(productCols)

  const handleClick = (product) => {
    dispatch(addToCheckout(product))
  }

  return (
    <div className="app-table-wrapper table-container">
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
            ) : isSearchResultsEmpty(searchQuery, data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.PRODUCTS_NO_MATCH}
              </TDStatus>
            ) : isItemsEmpty(data) ? (
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
        <span className="badge bg-light">
          {category}
        </span>
      </td>
      <td>{stocks}</td>
      <td>{price}</td>
      <td className="app-sx-8">
        <PrimaryButton 
          size="btn-sm"
          isDisabled={isCheckedOut}
          onClick={onClick}
        >
          Checkout
        </PrimaryButton>
      </td>
    </tr>
  )
}

function PaginationContainer({rowsPerPage, currentPage, lastPage, isLoading, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <SelectInput
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">{`Page ${currentPage} of ${lastPage}`}</label>
        <div className="btn-group">
          <SecondaryButton isDisabled={isLoading || currentPage <= 1} onClick={onPrevious}>Prev</SecondaryButton>
          <SecondaryButton isDisabled={isLoading || currentPage >= lastPage } onClick={onNext}>Next</SecondaryButton>
        </div>
      </div>
    </div>
  )
}

export default ProductsTable