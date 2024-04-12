import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import InputSelect from "../../components/inputs/InputSelect.jsx"
import { columns, columnsSize } from "./Util.jsx"
import DateHelper from "../../../utils/helpers/DateHelper.jsx"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import AppSearchField from "../../components/inputs/AppSearchField.jsx"
import { productCategories, rowsPerPages } from "../../../utils/Config.jsx"
import { BiPlus } from "react-icons/bi"
import { isItemsEmpty, isSearchHasEmptyResults } from "../../../utils/Helper.jsx"
import { PrimaryButton, SecondaryButton, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import ModalType from "../../../utils/classes/ModalType.jsx"
import ProductCategory from "../../../utils/classes/ProductCategory.jsx"
import { InventoryContext } from "./InventoryProvider.jsx"
import { resetStates, setProduct, setSearchQuery, toggleModal } from "../../redux/inventorySlice.jsx"

const VITE_DELAY = import.meta.VITE_DELAY

function ProductsTable() {
  const dispatch = useDispatch()

  const { searchQuery } = useSelector((state) => state.inventory)
  const { apiResource, handleSearchProductsAsync } = useContext(InventoryContext)
  const { data, meta } = apiResource.data

  const handleChange = (e) => {
    dispatch(setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value, page: 1 }))
    handleSearchProductsAsync.cancel()
  }

  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchProductsAsync.cancel()
  }
  const handleNext = () => {
    let page = searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchProductsAsync.cancel()
  }

  return (
    <>
      <FilteringContainer 
        name={searchQuery.name}
        status={searchQuery.status}
        onChange={handleChange}
      />
      <TableContainer 
        isLoading={apiResource.isLoading} 
        searchQuery={searchQuery}
        data={data}
        error={apiResource.error}
      />
      <PaginationContainer
        rowsPerPage={searchQuery.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        isLoading={apiResource.isLoading}
        onChange={handleChange} 
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
function FilteringContainer({name, category, onChange}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleModal({modalType: ModalType.CREATE, open: true}))
  }

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <AppSearchField
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
            defaultOption="-- All Categories --"
            value={category}
            onChange={onChange}
          />
        </div>
      </div>
      <div>
        <SecondaryButton onClick={handleClick}>
          <BiPlus className="me-1" />
          Create Product
        </SecondaryButton>
      </div>
    </div>
  )
}
function TableContainer({isLoading, searchQuery, data, error}) {
  const dispatch = useDispatch()

  const handleUpdateClick = (product) => {
    // reset errors before showing modal
    dispatch(resetStates())
    dispatch(setProduct(product))
    
    // adding delay to finish the hiding effect of errors
    setTimeout(() => dispatch(toggleModal({
      modalType: ModalType.UPDATE, open: true}
    )), VITE_DELAY)
  }

  const handleRemoveClick = (product) => {
    dispatch(setProduct(product))
    dispatch(toggleModal({modalType: ModalType.REMOVE, open: true}))
  }

  return (
    <div className="app-table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.PRODUCTS_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={columnsSize}>
                {error.message ? error.message : GenericMessage.PRODUCTS_ERROR}
              </TDStatus>
            ) : isSearchHasEmptyResults(searchQuery, data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.PRODUCTS_NO_MATCH}
              </TDStatus>
            ) : isItemsEmpty(data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.PRODUCTS_EMPTY}
              </TDStatus>
            ) : data ? data.map((product, index) => (
              <TDProduct
                key={index}
                product={product}
                onUpdateClick={handleUpdateClick}
                onRemoveClick={handleRemoveClick}
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

function TDProduct({product, onUpdateClick, onRemoveClick}) {
  const name = StringHelper.truncate(product.name)
  const description = StringHelper.truncate(product.description)
  const category = ProductCategory.toCategory(product.category_id)
  const stocks = StringHelper.toStocks(product.quantity)
  const srp = StringHelper.toPesoCurrency(product.srp)
  const memberPrice = StringHelper.toPesoCurrency(product.member_price)
  const addedBy = StringHelper.truncate(product.added_by)
  const dateCreated = DateHelper.toIsoStandard(product.created_at)
  const dateModified = DateHelper.toIsoStandard(product.updated_at)

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
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>{addedBy}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
      <td className="app-sx-8">
        <PrimaryButton 
          size="btn-sm"
          onClick={() => onUpdateClick(product)}
        >
          Update
        </PrimaryButton>
        <SecondaryButton 
          size="btn-sm"
          onClick={() => onRemoveClick(product)}
        >
          Remove
        </SecondaryButton>
      </td>
    </tr>
  )
}
function PaginationContainer({rowsPerPage, currentPage, lastPage, isLoading, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <InputSelect
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
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