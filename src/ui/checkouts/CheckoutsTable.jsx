
import { TDStatus, THeaders } from "../common/TableUtils.jsx";
import { columns } from "./util.js";
import { isEmpty, size } from "lodash";
import GenericMessage from "../../util/classes/GenericMessage.js";
import StringHelper from "../../util/helpers/StringHelper.js";
import { useSelector } from "react-redux";

function CheckoutsTable() {
  const { order } = useSelector((state) => state.checkouts)
  const checkouts = isEmpty(order) ? [] : order.checkouts
  const colSpan = size(columns)

  return (
    <ol className="list-group table-container">
      {
        checkouts.map((checkout, index) => (
          <CheckoutItem key={index} checkout={checkout} />
        ))
      }
    </ol>
  )
}
function CheckoutItem({checkout}) {
  const name = StringHelper.truncate(checkout.name)
  const description = StringHelper.truncate("lorem ipsum, dolor")
  const srp = StringHelper.toPesoCurrency(checkout.srp)
  const quantity = StringHelper.toPcs(checkout.quantity)

  return (
    <li className="list-group-item">
      <div className="mb-2">
        <h6 className="fw-bold mb-0">{name}</h6>
        <div className="hstack gap-2 text-body-secondary">
          <span>{description}</span>
          <span>{srp}</span>
        </div>
      </div>
      <h6 className="fw-bold mb-0">{srp}, {quantity}</h6>
    </li>
  )
}

function TDCheckout({checkout}) {
  const name = StringHelper.truncate(checkout.name)
  const quantity = StringHelper.toPcs(checkout.quantity)
  const srp = StringHelper.toPesoCurrency(checkout.srp)
  const memberPrice = StringHelper.toPesoCurrency(32)
  const amountDue = StringHelper.toPesoCurrency(50)

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>{amountDue}</td>
    </tr>
  )
}

export default CheckoutsTable