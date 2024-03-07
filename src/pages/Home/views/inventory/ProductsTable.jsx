import "boxicons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { fetchProducts, toggleCreateModal, toggleRemoveModal, toggleUpdateModal } from "../../../../redux/inventory/inventorySlice.jsx"

const headers = [
  "Name", "Description", "Category", "Quantity",
  "SRP", "Member Price", "Created At", 
  "Updated At", "#"
]
const headersSize = headers.length

function ProductsTable() {
  const dispatch = useDispatch()
  const { fetch } = useSelector((state) => state.inventory)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="-sy-8">
      <FilterSection status={fetch.status} />
      <MainSection status={fetch.status} products={fetch.products} />
      <PaginationSection status={fetch.status} />
    </div>
  )
}

function FilterSection({status}) {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(toggleCreateModal(true)) 
  }

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
          onClick={handleClick}
        >
          <box-icon name='plus' size="14px"></box-icon>
          <span>Create</span>
        </button>
      </div>
    </div>
  )
}

function MainSection({status, products}) {
  const dispatch = useDispatch()

  const handleUpdateClick = (product) => {
    dispatch(toggleUpdateModal({product: product, isOpen: true}))
  }
  
  const handleRemoveClick = (product) => {
    dispatch(toggleRemoveModal({product: product, isOpen: true}))
  }

  return (
    <div className="app-table-wrapper">
      <table className="table">
        <thead>
          <tr>{headers.map((item, index) => <th key={index}>{item}</th>)}</tr>
        </thead>
        <tbody>
        {
          status == UiStatus.LOADING ? (
            <tr>
              <td className="app-table-cell-status" colSpan={headersSize}>Fetching Products...</td>
            </tr>
          ) : status == UiStatus.ERROR ? (
            <tr>
              <td className="app-table-cell-status" colSpan={headersSize}>Something went wrong.</td>
            </tr>
          ) : status == UiStatus.EMPTY ? (
            <tr>
              <td className="app-table-cell-status" colSpan={headersSize}>
                Press &apos;+&apos; button to add product in inventory.
              </td>
            </tr>
          ) : products.map((product, index) => 
            (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td><span className="badge bg-light">{product.category}</span></td>
                <td>{product.quantity}</td>
                <td>{product.srp}</td>
                <td>{product.member_price}</td>
                <td>{product.created_at}</td>
                <td>{product.updated_at}</td>
                <td className="-sx-8">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm mr-2" 
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    type="button" 
                    onClick={() => handleRemoveClick(product)}
                  >
                    Remove
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