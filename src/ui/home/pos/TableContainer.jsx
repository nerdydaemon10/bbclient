import { BiPlus } from "react-icons/bi"

import UiStatus from "../../../utils/classes/UiStatus.jsx"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import { THeaders, TDStatus } from "../../components/TableUtils.jsx"
import { useDispatch, useSelector } from "react-redux"
import { checkoutProduct } from "../../redux/pos/posSlice.jsx"
import { PrimaryButton } from "../../common"

const headers = [
  "Name", "Category", "Quantity", 
  "SRP", "Member Price", "#"
]
const headersSize = headers.length

function TableContainer({status, data, error}) {
  const { checkouts } = useSelector((state) => state.pos)
  const isLoading = status == UiStatus.FETCHING || status == UiStatus.SEARCHING || status == UiStatus.LOADING
  
  return (
    <div className="table-container app-table-wrapper">
      <table className="table">
        <thead>
          <THeaders headers={headers} />
        </thead>
        <tbody>
          {
            isLoading ? (
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
                disabled={checkProduct(checkouts, product.id)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function TDProduct({product, disabled}) {
  const name = StringHelper.truncate(product.name)
  const stocks = StringHelper.toStocks(product.quantity)
  const srp = StringHelper.toPesoCurrency(product.srp)
  const memberPrice = StringHelper.toPesoCurrency(product.member_price)

  const dispatch = useDispatch()

  const handleClick = (product) => {
    if (!disabled) {
      dispatch(checkoutProduct(product))
    }
  }

  return (
    <tr key={product.product_id}>
      <td>{name}</td>
      <td>
        <span className="badge bg-light">
          {StringHelper.toProductCategoryName(product.category_id)}
        </span>
      </td>
      <td>{stocks}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>
        <PrimaryButton
          size="btn-sm"
          isDisabled={disabled}
          onClick={() => handleClick(product)}
        >
          <BiPlus className="me-1" />
          Checkout
        </PrimaryButton>
      </td>
    </tr>
  )
}

function checkProduct(checkouts, id) {
  return !!checkouts.find(checkout => checkout.id == id)
}

export default TableContainer