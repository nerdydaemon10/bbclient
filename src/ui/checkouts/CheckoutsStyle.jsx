import { createGlobalStyle } from "styled-components";

const CheckoutsStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas: 
    "title-container title-container"
    "table-container checkout-details-container"
    "table-container receipt-list";
}

/* --TITLE-CONTAINER-- */
.title-container {
  grid-area: title-container;
}

/* --TABLE-CONTAINER-- */
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}

/* --CHECKOUT-DETAILS-CONTAINER-- */
.checkout-details-container {
  display: grid;
  grid-area: checkout-details-container;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  grid-template-areas: 
    "order-details-container"
    "customer-details-container";
}
.receipt-list {
  grid-area: receipt-list;
}
/* --CHECKOUT-DETAILS-CONTAINER-- */
.order-details-container {
  grid-area: order-details-container;
  max-width: 278px;
}
/* --CHECKOUT-DETAILS-CONTAINER-- */
.customer-details-container {
  grid-area: customer-details-container;
  max-width: 278px;
}


`

export default CheckoutsStyle