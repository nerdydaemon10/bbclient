import StringHelper from "../../../util/helpers/StringHelper.js";
import ReceiptListStyle from "./ReceiptListStyle.jsx";

function ReceiptList({className, receipts}) {
  return (
    <>
      <ReceiptListStyle />
      <ul className={`receipt-list list-unstyled m-0 border rounded ${className}`}>
        {receipts.map((receipt, index) => (
          <li key={index} className="receipt-list-item d-flex justify-content-between border-bottom p-1">
            <span className="fs-7 fw-medium">{receipt.name}:</span>
            <span className="fs-7 fw-normal">{StringHelper.toPesoCurrency(receipt.value)}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ReceiptList