import { useSelector } from "react-redux"

import DateHelper from "../../../../utils/helpers/DateHelper.jsx"
import FakeDataInventories from "../../../../utils/data/FakeDataInventories.jsx"
import ProductsSection from "./ProductsSection.jsx"
import OrdersSection from "./OrdersSection.jsx"
import "./POSView.css"

function POSView() {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <div className="pos-title-section">
        <h3 className="mb-0">POS System</h3>
        <p>{`Goodmorning ${user.user.username} Welcome Back!`}</p>
      </div>
      <div className="pos-filters-section">
        <div className="row gx-2">
          <div className="col-9">
            <input type="text" className="form-control" placeholder="Filter Products..."/>
          </div>
          <div className="col-3">
            <select className="form-select">
              <option>--All-Categories--</option>
            </select>
          </div>
        </div>
      </div>
      <div className="pos-actions-section">
        <div className="mb-2 d-flex justify-content-between align-center">
          <button className="btn btn-secondary d-flex align-center app-sx-4">
            <box-icon name='plus' size="14px"></box-icon>
            Add Customer
          </button>
          <div className="btn-group">
            <button className="btn btn-secondary d-flex align-center app-sx-4">
              <box-icon name='reset' size="14px"></box-icon>
              Reset Order
            </button>
            <button className="btn btn-secondary d-flex align-center app-sx-4">
              <box-icon name='edit' size="14px"></box-icon>
              Edit Info
            </button>
          </div>
        </div>
      </div>
      <div className="pos-products-section">
        <div className="app-table-wrapper">
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
                    <td>{DateHelper.display(item.created_at)}</td>
                    <td>{DateHelper.display(item.updated_at)}</td>
                    <td className="table-actions">
                      <button href="#" className="btn btn-dark btn-sm mr-2">
                        Place Order
                      </button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="pos-orders-section">
        <div className="app-border">
          <ul className="list">
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
            <li>Black Coffee (2pcs)</li>
          </ul>
          <div>
            <h2>Total: 200.00</h2>
          </div>
          <button className="btn btn-dark btn-block" disabled={true}>PLACE ORDER</button>
        </div>
      </div>
    </>
  )
}

export default POSView