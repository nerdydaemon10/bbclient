import { TDStatus, THeaders } from "../../../../components/TableUtils.jsx"
import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"
import AppSecondaryButton from "../../../../components/buttons/AppSecondaryButton.jsx"
import GenericMessage from "../../../../utils/classes/GenericMessage.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import StringHelper from "../../../../utils/helpers/StringHelper.jsx"
import styles from "./styles.module.css"
import DateHelper from "../../../../utils/helpers/DateHelper.jsx"
import { useContext } from "react"
import InventoryContext from "../../../../contexts/InventoryContext.jsx"
import { useDispatch } from "react-redux"
import { resetErrors } from "../../../../redux/inventory/inventorySlice.jsx"

const headers = [
  "Name", "Category", "Quantity", 
  "SRP", "Member Price", 
  "Created At", "#"
]
const headersSize = headers.length

function TableContainer({status, data, error}) {
  return (
    <div className={`${styles.tableContainer} app-table-wrapper`}>
      <table className="table">
        <thead>
          <THeaders headers={headers} />
        </thead>
        <tbody>
          {
            status == UiStatus.LOADING ? (
              <TDStatus 
                message={GenericMessage.PRODUCTS_FETCHING} 
                headersSize={headersSize} />
            ) : status == UiStatus.ERROR ? (
              <TDStatus 
                message={error.message} 
                headersSize={headersSize} 
              />
            ) : status == UiStatus.EMPTY ? (
              <TDStatus 
                message={GenericMessage.PRODUCTS_NO_MATCH} 
                headersSize={headersSize} 
              />
            ) : data.map((product, index) => (
              <TDProduct 
                key={index}
                product={product}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
  
function TDProduct({product, disabled}) {
  const dispatch = useDispatch()
  const { setIsUpdateModalOpen, setIsRemoveDialogOpen, setProduct } = useContext(InventoryContext)

  const name = StringHelper.truncate(product.name)
  const stocks = StringHelper.toStocks(product.quantity)
  const srp = StringHelper.toPeso(product.srp)
  const memberPrice = StringHelper.toPeso(product.member_price)
  const createdAt = DateHelper.toDisplay(product.created_at)
  const category = StringHelper.toProductCategoryName(product.category_id)

  const handleUpdateClick = (product) => {
    dispatch(resetErrors())
    setProduct(product)
    setIsUpdateModalOpen(true)
  }

  const handleRemoveClick = (product) => {
    setProduct(product)
    setIsRemoveDialogOpen(true)
  }

  return (
    <tr key={product.product_id}>
      <td>{name}</td>
      <td>
        <span className="badge bg-light">
          {category}
        </span>
      </td>
      <td>{stocks}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>{createdAt}</td>
      <td className="app-sx-8">
        <AppPrimaryButton
          text="Update"
          size="btn-sm"
          disabled={disabled}
          onClick={() => handleUpdateClick(product)}
        />
        <AppSecondaryButton
          text="Remove"
          size="btn-sm"
          disabled={disabled}
          onClick={() => handleRemoveClick(product)}
        />
      </td>
    </tr>
  )
}

export default TableContainer