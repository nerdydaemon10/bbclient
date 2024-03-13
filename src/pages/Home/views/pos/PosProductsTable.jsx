import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import GenericMessage from "../../../../utils/classes/GenericMessage.jsx"
import StringHelper from "../../../../utils/helpers/StringHelper.jsx"
import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import { debounce } from "lodash"

const headers = [
  "Name", "Category",
  "Quantity", "SRP",
  "Member Price", "#"
]
const headersSize = headers.length

function PosProductsTable() {
  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.pos)
  const { data, meta, total, status, error } = products

  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [perPage, setPerPage] = useState(RowsPerPages[0])
  const [page, setPage] = useState(1)

  console.log(meta)

  const handleSearchProducts = debounce(() => {
    dispatch(fetchProductsAsync({
      name: name,
      category_id: categoryId,
      per_page: perPage,
      page: page
    }))
  }, 500)

  const handleNameChange = (e) => {
    setName(e.target.value)
    handleSearchProducts.cancel()
  }

  const handleCategoryIdChange = (e) => {
    setPage(1)
    setCategoryId(e.target.value)
    handleSearchProducts.cancel()
  }

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value)
    handleSearchProducts.cancel()
  }

  const handlePreviousClick = () => {
    setPage(prev => (prev > 1) ? prev - 1 : 1)
    handleSearchProducts.cancel()
  }

  const handleNextClick = () => {
    setPage(prev => (prev < meta.last_page) ? prev + 1 : meta.last_page)
    handleSearchProducts.cancel()
  }

  useEffect(() => {
    handleSearchProducts()
    
    return () => { 
      handleSearchProducts.cancel() 
    }
  }, [name, categoryId, perPage, page]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="pos-products-table-header">
        <div className="row gx-2">
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              placeholder="Filter Products..."
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="col-3">
            <select 
              className="form-select" 
              value={categoryId}
              onChange={handleCategoryIdChange}
            >
              <option value={""}>-- All Categories --</option>
              {ProductCategories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="pos-products-table-body app-table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((item, index) => <th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              products.status == UiStatus.LOADING ? (
                <tr>
                  <td className="app-table-cell-status" colSpan={headersSize}>
                    {GenericMessage.PRODUCTS_FETCHING}
                  </td>
                </tr>
              ) : products.status == UiStatus.ERROR ? (
                <tr>
                  <td className="app-table-cell-status" colSpan={headersSize}>
                    {products.error.message}
                  </td>
                </tr>
              ) : products.status == UiStatus.EMPTY ? (
                <tr>
                  <td className="app-table-cell-status" colSpan={headersSize}>
                    {GenericMessage.PRODUCTS_NO_MATCH}
                  </td>
                </tr>
              ) : products.data.map((product, index) => (
                <TableData key={index} product={product} index={index} />
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="pos-products-table-footer d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center app-sx-8">
          <label className="app-text-label app-text-nowrap">Rows per page</label>
          <select 
            className="form-select"
            disabled={meta.total == 0}
            value={perPage}
            onChange={handlePerPageChange}
          >
            {RowsPerPages.map((count, index) => (<option key={index} value={count}>{count} rows</option>))}
          </select>
        </div>
        <div className="d-flex align-items-center app-sx-8">
          <label className="app-text-label app-text-nowrap">Page {meta.current_page} of {meta.last_page}</label>
          <div className="btn-group">
            <button 
              className="btn btn-secondary" 
              disabled={page <= 1}
              onClick={handlePreviousClick}
            >
              <box-icon name='chevron-left' size="14px"></box-icon>
            </button>
            <button 
              className="btn btn-secondary" 
              disabled={page >= meta.last_page}
              onClick={handleNextClick}
            >
              <box-icon name='chevron-right' size="14px"></box-icon>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function TableData({product, index}) {
  const name = StringHelper.truncate(product.name)
  const stocks = StringHelper.toStocks(product.quantity)
  const srp = StringHelper.toPesoCurrency(product.srp)
  const memberPrice = StringHelper.toPesoCurrency(product.member_price)

  return (
    <tr key={index}>
      <td>{name}</td>
      <td>
        <span className="badge bg-light">
          {StringHelper.toProductCategoryName(product.category_id)}
        </span>
      </td>
      <td>{stocks}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>
        <button
          type="button"
          className="btn btn-dark btn-sm d-flex align-center app-sx-4" 
          onClick={() => {}}
        >
          <box-icon color='white' name='plus' size='16px'></box-icon>
          Place Order
      </button>
      </td>
    </tr>
  )
}

export default PosProductsTable