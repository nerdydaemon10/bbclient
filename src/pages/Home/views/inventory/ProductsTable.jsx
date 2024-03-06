import "boxicons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { fetchProducts } from "../../../../redux/inventory/inventorySlice.jsx"

const headers = [
  "Name", "Description", "Category", "Quantity",
  "SRP", "Member Price", "Created At", 
  "Updated At", "#"
]
const headersSize = headers.length

function ProductsTable({onCreateModalShownClick}) {
  const dispatch = useDispatch()
  const { fetch } = useSelector((state) => state.inventory)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="-sy-8">
      <FilterSection 
        status={fetch.status} 
        onCreateModalShownClick={onCreateModalShownClick} 
      />
      <MainSection 
        status={fetch.status} 
        products={fetch.products} 
      />
      <PaginationSection status={fetch.status} />
    </div>
  )
}

function FilterSection({status, onCreateModalShownClick}) {
  return (
    <div className="-sy-8">
      <div className="d-flex align-center justify-content-between">
        <div className="d-flex -sx-8">
          <input 
            type="text" 
            className="form-control"
            placeholder="Filter Products..." 
            disabled={UiHelper.setDisabledByStatusCases(status, [UiStatus.LOADING, UiStatus.EMPTY, UiStatus.ERROR])}
          />
          <select 
            className="form-select" 
            disabled={UiHelper.setDisabledByStatusCases(status, [UiStatus.LOADING, UiStatus.EMPTY, UiStatus.ERROR])}
          >
            <option>All</option>
            { ProductCategories.map((item, index) => <option key={index} id={item.id}>{item.name}</option> )}
          </select>
        </div>
        <button 
          className="btn btn-secondary d-flex align-center -sx-4" 
          disabled={UiHelper.setDisabledByStatusCases(status, [UiStatus.LOADING])}
          onClick={onCreateModalShownClick}
        >
          <box-icon name='plus' size="14px"></box-icon>
          <span>Create</span>
        </button>
      </div>
    </div>
  )
}
function MainSection({status, products}) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>{headers.map((item, index) => <th key={index}>{item}</th>)}</tr>
        </thead>
        <tbody>
        {
          status == UiStatus.LOADING ? (
            <tr>
              <td className="-table-cell-status" colSpan={headersSize}>Fetching Products...</td>
            </tr>
          ) : status == UiStatus.ERROR ? (
            <tr>
              <td className="-table-cell-status" colSpan={headersSize}>Something went wrong.</td>
            </tr>
          ) : status == UiStatus.EMPTY ? (
            <tr>
              <td className="table-cell-status" colSpan={headersSize}>
                Press &apos;+&apos; button to add product in inventory.
              </td>
            </tr>
          ) : products.map((product, index) => 
            (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.categoryId}</td>
                <td>{product.quantity}</td>
                <td>{product.srp}</td>
                <td>{product.memberPrice}</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>
                <td className="-sx-8">
                  <button href="#" className="btn btn-dark btn-sm mr-2">
                    Edit
                  </button>
                  <button href="#" className="btn btn-secondary btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  )
}
function PaginationSection({status}) {
  const isDisabled = UiHelper.setDisabledByStatusCases(status, [UiStatus.LOADING, UiStatus.EMPTY, UiStatus.ERROR])

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center -sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <select className="form-select" disabled={isDisabled}>
          <option>50</option>
        </select>
      </div>
      <div className="d-flex align-items-center -sx-8">
        <label className="app-text-label app-text-nowrap">Page 1 of 10</label>
        <div className="btn-group">
          <button className="btn btn-secondary" disabled={isDisabled}>
            <box-icon name='chevron-left' size="14px"></box-icon>
          </button>
          <button className="btn btn-secondary" disabled={isDisabled}>1</button>
          <button className="btn btn-secondary" disabled={isDisabled}>2</button>
          <button className="btn btn-secondary" disabled={isDisabled}>3</button>
          <button className="btn btn-secondary" disabled={isDisabled}>
            <box-icon name='chevron-right' size="14px"></box-icon>
          </button>
        </div>
      </div>
    </div> 
  )
}

export default ProductsTable