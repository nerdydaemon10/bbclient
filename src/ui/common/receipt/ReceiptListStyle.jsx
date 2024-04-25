import { createGlobalStyle } from "styled-components";

const ReceiptListStyle = createGlobalStyle`
.receipt-list {
  background-color: var(--bs-gray-100);
  --bs-border-style: dashed;
  --bs-border-color: var(--bs-dark);
}
.receipt-list-item:last-child {
  --bs-border-color: var(--bs-transparent);
}
`

export default ReceiptListStyle