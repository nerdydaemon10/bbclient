import { createGlobalStyle } from "styled-components";

const OrdersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr var(--dashboard-side-width);
  grid-template-rows: max-content 1fr;
  grid-template-areas: 
    "title-section title-section"
    "orders-table orders-side"
}

/* --TITLE-SECTION-- */
.title-section {
  grid-area: title-section;
}
/* --ORDERS-TABLE-- */
.orders-table {
  grid-area: orders-table;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "table-data"
    "table-pagination";
  overflow: auto !important;
}

/* --TABLE-DATA-- */
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}

/* --TABLE-PAGINATION-- */
.table-pagination {
  grid-area: table-pagination;
}

/* --ORDERS-SIDE-- */
.orders-side {
  grid-area: orders-side;
  overflow-x: hidden;
  overflow-y: auto;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "card";
}
/* --ORDERS-SIDE.HAS-VIEW-ORDER-- */
.orders-side.has-view-order {
  overflow-x: hidden;
  overflow-y: auto;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "card"
    "receipt-list";
}

/* --ORDERS-SIDE-- */
.card {
  grid-area: card;
  overflow-x: hidden;
  overflow-y: auto;
}

/* --ORDERS-SIDE-- */
.receipt-list {
  grid-area: receipt-list;
}
`

export default OrdersStyle