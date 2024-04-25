import { createGlobalStyle } from "styled-components";

const CheckoutListStyle = createGlobalStyle`
.checkout-list {
}
.checkout-list-item {
  --bs-border-width: 1px;
  --bs-border-color: var(--bs-transparent);
}
.checkout-list-item:nth-child(odd) {
  background-color: var(--bs-gray-100);
  --bs-border-style: dashed;
  --bs-border-color: var(--bs-dark);
}

.checkout-list-qty-controls {
  max-width: 32px;
}
`

export default CheckoutListStyle