
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
    <div className="table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns} />
        </thead>
        <tbody>
          {
            isEmpty(checkouts) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.CHECKOUTS_EMPTY}
              </TDStatus>
            ) : checkouts ? checkouts.map((checkout, index) => (
              <TDCheckout
                key={index}
                checkout={checkout}
              />
            )) : (
              <></>
            )
          }
        </tbody>
      </table>
    </div>
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