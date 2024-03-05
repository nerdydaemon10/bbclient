import { BiPlus } from "react-icons/bi"
import { BiChevronLeft } from "react-icons/bi"
import { BiChevronRight } from "react-icons/bi"
import DateHelper from "../../../../utils/helpers/DateHelper.jsx"

import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../../redux/inventory/inventorySlice.jsx"
import { useEffect } from "react"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"

function InventoryView() {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.inventory)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  return (
    <div>
      <h1 className="app-text-title">Inventory</h1>
      <p className="app-text-title-caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <ProductsTable status={status} products={products} />
      <CreateModal />
    </div>
  )
}

function CreateModal() {
  return (
  <div className="app-modal">

  </div>
  )
}
function ProductsTable(props) {
  const { status, products } = props
  const headers = [
    "Name", "Category", "Quantity",
    "SRP", "Member Price", "Created At", 
    "Updated At", "#"
  ]
  const headersSize = headers.length

  return (
    <div className="app-sy-8">
      <ProductsTableHeader status={status} />
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>{ headers.map((item, index) => <th key={index}>{item}</th>) }</tr>
          </thead>
          <tbody>
          {
            status == UiStatus.LOADING ? (
              <tr>
                <td className="table-cell-status" colSpan={headersSize}>Fetching Products...</td>
              </tr>
            ) : status == UiStatus.ERROR ? (
              <tr>
                <td className="table-cell-status" colSpan={headersSize}>Something went wrong.</td>
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
                  <td>{product.categoryId}</td>
                  <td>{product.quantity}</td>
                  <td>{product.srp}</td>
                  <td>{product.memberPrice}</td>
                  <td>{product.createdAt}</td>
                  <td>{product.updatedAt}</td>
                  <td className="app-sx-8">
                    <button href="#" className="btn btn-dark btn-sm mr-2">
                      Edit
                    </button>
                    <button href="#" className="btn btn-secondary btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
      <ProductsTableFooter />
    </div>
  )
}
function ProductsTableHeader(props) {
  const disabled = props.status != UiStatus.IDLE
  const buttonDisabled = (props.status != UiStatus.IDLE) && (props.status != UiStatus.EMPTY)

  return (
    <div className="d-flex align-center justify-content-between">
      <div className="d-flex app-sx-8">
        <input type="text" className="form-control" placeholder="Filter Products..." disabled={disabled} />
        <select className="form-select" disabled={disabled}>
          <option>-- All-Categories --</option>
        </select>
      </div>
      <button className="btn btn-secondary d-flex align-center" disabled={buttonDisabled}>
        <BiPlus size={20} />
        Create
      </button>
    </div>
  )
}
function ProductsTableFooter(props) {
  const { status } = props
  const disabled = status != UiStatus.IDLE

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <select className="form-select" disabled={disabled}>
          <option>50</option>
        </select>
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Page 1 of 10</label>
        <div className="btn-group">
          <button className="btn btn-secondary">
            <BiChevronLeft />
          </button>
          <button className="btn btn-secondary">1</button>
          <button className="btn btn-secondary">2</button>
          <button className="btn btn-secondary">3</button>
          <button className="btn btn-secondary">
            <BiChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryView