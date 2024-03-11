import DateHelper from "../../../../utils/helpers/DateHelper.jsx"
import FakeDataInventories from "../../../../utils/data/FakeDataInventories.jsx"

function ProductsSection() {
  return (
    <>
      <div className="mb-2">
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
    </>
  )
}

export default ProductsSection