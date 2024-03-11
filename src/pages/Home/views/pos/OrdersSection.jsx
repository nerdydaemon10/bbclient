import "boxicons"

function OrdersSection() {
  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-center">
        <button className="btn btn-secondary d-flex align-center app-sx-4">
          <box-icon name='plus' size="14px"></box-icon>
          Add Customer
        </button>
        <div className="btn-group">
          <button className="btn btn-secondary d-flex align-center app-sx-4">
            <box-icon name='reset' size="14px"></box-icon>
            Reset
          </button>
          <button className="btn btn-secondary d-flex align-center app-sx-4">
            <box-icon name='edit' size="14px"></box-icon>
            Edit Info
          </button>
        </div>
      </div>
      <div className="app-border app-p-16">
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
        </ul>
        <div>
          <h2>Total: 200.00</h2>
        </div>
        <button className="btn btn-dark btn-block" disabled={true}>PLACE ORDER</button>
      </div>
    </>  
  )
}

export default OrdersSection