import { useEffect } from "react"
import { BiPlus } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { BiChevronLeft } from "react-icons/bi"
import { BiChevronRight } from "react-icons/bi"
import DateHelper from "../../../utils/helpers/DateHelper.jsx"

import FakeDataInventories from "../../../utils/data/FakeDataInventories.jsx"

function InventoryView() {
  return (
    <>
      <h1 className="app-text-title">Inventory</h1>
      <p className="app-text-title-caption">Here's a list of your products for this month!</p>  
      <InventoryTable />
    </>
  )
}

function InventoryTable() {
  return (
    <div className="app-sy-8">
      <InventoryTableHeader />
      <InventoryTableBody />
      <InventoryTableFooter />
    </div>
  )
}

function InventoryTableBody() {
  //const dispatch = useDispatch()
  //const products = useSelector((state) => state.products.products)
  //const status = useSelector((state) => state.products.status)

  /*useEffect(() => {
    dispatch(fetchProducts())
  }, [])*/

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Srp</th>
              <th>Price</th>
              <th>Member Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
              FakeDataInventories.map((item) =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <span className="badge bg-light">{item.category_id}</span>
                  </td>
                  <td>{item.quantity} stocks</td>
                  <td>P {item.srp}</td>
                  <td>P {item.price}</td>
                  <td>P {item.memberPrice}</td>
                  <td>{DateHelper.toStandardDate(item.created_at)}</td>
                  <td>{DateHelper.toStandardDate(item.updated_at)}</td>
                  <td className="table-actions">
                    <button href="#" className="btn btn-dark btn-sm mr-2">
                      Edit
                    </button>
                    <button href="#" className="btn btn-secondary btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

function InventoryTableHeader() {
  return (
    <div className="d-flex align-center justify-content-between mb-2">
      <div className="d-flex app-sx-8">
        <input type="text" className="form-control" placeholder="Filter Inventory..."/>
        <select className="form-select">
          <option>-- All-Categories --</option>
        </select>
      </div>
      <button className="btn btn-secondary d-flex align-center">
        <BiPlus size={20} />
        Create
      </button>
    </div>
  )
}

function InventoryTableFooter() {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <select className="form-select">
          <option>10</option>
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