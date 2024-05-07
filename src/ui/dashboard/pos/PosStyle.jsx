import { createGlobalStyle } from "styled-components";

const PosStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 1fr 320px;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-container title-container title-container"
    "filtering-container filtering-container tabs-container"
    "table-container table-container tab-container"
    "pagination-container pagination-container place-order-btn-container";
}

/*--TITLE-CONTAINER--*/
.title-container {
  grid-area: title-container;
}

/* --FILTERING-CONTAINER-- */
.filtering-container {
  grid-area: filtering-container;
}
.filtering-container.is-products-table {
  display: flex;
}
.filtering-container.is-customers-table {
  display: block;
}

/*--TABLE-CONTAINER--*/
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}

/*--PAGINATION-CONTAINER--*/
.pagination-container {
  grid-area: pagination-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --TABS-CONTAINER-- */
.tabs-container {
  grid-area: tabs-container;
}

/* --TAB-CONTAINER-- */
.tab-container {
  grid-area: tab-container;
  display: grid;
  row-gap: 0;
  overflow: hidden;
}

/* --TAB-CONTAINER:IS-CHECKOUTS-- */
.tab-container.is-checkouts {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "checkout-list"
    "receipt-list";
}
/* --CHECKOUT-LIST-- */
.checkout-list {
  grid-area: checkout-list;
  overflow-y: auto;
}
/*--CHECKOUT-DETAILS--*/
.receipt-list {
  grid-area: receipt-list;
}
/* --TAB-CONTAINER:IS-ORDER-INFO-- */
.tab-container.is-customer {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 
    "customer-details";
}
/*--CUSTOMER-DETAILS--*/
.customer-details {
  grid-area: customer-details;
}
.customer-details.is-empty {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* --PLACE-ORDER-BTN-CONTAINER-- */
.place-order-btn-container {
  grid-area: place-order-btn-container;
}
`

export default PosStyle