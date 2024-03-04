import { useDispatch, useSelector } from "react-redux"
import AppLocalStorage from "../../../utils/AppLocalStorage.jsx"
import AppEmptySection from "../../../components/dashboard/AppEmptySection.jsx"
import FakeDataInventories from "../../../utils/data/FakeDataInventories.jsx"
import DateHelper from "../../../utils/helpers/DateHelper.jsx"
import { BiPlus } from "react-icons/bi"

function PointOfSaleView() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <h1 className="app-text-title">POS System</h1>
      <p className="app-text-title-caption">Goodmorning Keanno, Welcome Back!</p>
      <div className="row ">
        <div className="col-8">
          <div className="mb-3">
            <div className="row gx-2">
              <div className="col-3">
                <select className="form-select">
                  <option>--All-Categories--</option>
                </select>
              </div>
              <div className="col-9">
                <input type="text" className="form-control" placeholder="Filter Products..."/>
              </div>
            </div>
          </div>
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
                      Place Order
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
          </table>
        </div>
        <div className="col-4 app-debug-border">
          <h1>dasdas</h1>
        </div>
      </div>
    </>
  )
}

export default PointOfSaleView