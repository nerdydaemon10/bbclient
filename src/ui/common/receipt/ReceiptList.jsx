import { isEmpty, isNil } from "lodash"
import ReceiptListStyle from "./ReceiptListStyle.jsx"
import { Fragment } from "react"
import { toPeso, truncate } from "../../../util/helper.js"

function ReceiptList({className, receipts}) {
  const format = (receipt) => {
    if (isNil(receipt.format)) return truncate(receipt.value, 24)
    if (receipt.format == "currency") return toPeso(receipt.value)
  }

  return (
    <Fragment>
      <ReceiptListStyle />
      <ul className={`receipt-list d-flex flex-column justify-content-center list-unstyled m-0 border rounded ${className}`}>
        {receipts.filter(receipt => !isEmpty(receipt)).map((receipt, index) => (
        <li key={index} className="receipt-list-item d-flex flex-row justify-content-between gap-2 p-1 border-bottom">
            <span className="fs-6 fw-normal">{truncate(receipt.label, 24)}:</span>
            <span className="fs-6 fw-medium">{format(receipt)}</span>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

export default ReceiptList