import { createGlobalStyle } from "styled-components";

const OrdersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 275px;
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
}`

export default OrdersStyle