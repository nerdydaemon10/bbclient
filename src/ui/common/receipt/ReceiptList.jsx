import { isEmpty, isObject } from "lodash"
import ReceiptListStyle from "./ReceiptListStyle.jsx"

function ReceiptList({className, receipts}) {  
  return (
    <>
      <ReceiptListStyle />
      <ul className={`receipt-list d-flex flex-column justify-content-center list-unstyled m-0 border rounded ${className}`}>
        {receipts.filter(receipt => !isEmpty(receipt)).map((receipt, index) => (
          <li key={index} className="receipt-list-item d-flex flex-row justify-content-between gap-2 p-1  border-bottom">
            <span className="fs-7 fw-medium">{receipt.name}:</span>
            <span className="fs-7 fw-normal">{receipt.value}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ReceiptList