function InventoryProductsTable() {
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
                <td className="app-sx-8">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm" 
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

export default InventoryProductsTable