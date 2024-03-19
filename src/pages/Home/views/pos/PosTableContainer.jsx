import { BiPlus } from "react-icons/bi"

import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import StringHelper from "../../../../utils/helpers/StringHelper.jsx"
import GenericMessage from "../../../../utils/classes/GenericMessage.jsx"
import { THeaders, TDStatus } from "../../../../components/TableUtils.jsx"
import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"
import { useDispatch, useSelector } from "react-redux"
import { checkoutProduct } from "../../../../redux/pos/posSlice.jsx"

const headers = [
  "Name", "Category", "Quantity", 
  "SRP", "Member Price", "#"
]
const headersSize = headers.length

function PosTable({status, data, error}) {
  const { checkouts } = useSelector((state) => state.pos)

  return (
    <div className="pos-table-container app-table-wrapper">
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
        <AppPrimaryButton
          icon={<BiPlus className="me-1" />}
          text="Checkout"
          size="btn-sm"
          disabled={disabled}
          onClick={() => handleClick(product)}
        />
      </td>
    </tr>
  )
}

function checkProduct(checkouts, id) {
  return !!checkouts.find(checkout => checkout.id == id)
}

export default PosTable