import { createGlobalStyle } from "styled-components";

const OrdersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-container"
    "filtering-container"
    "table-container"
    "pagination-container";
}

/* --TITLE-CONTAINER-- */
.title-container {
  grid-area: title-container;
}

/* --FILTERING-CONTAINER-- */
.filtering-container {
  grid-area: filtering-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --TABLE-CONTAINER-- */
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}

/* --PAGINATION-CONTAINER-- */
.pagination-container {
  grid-area: pagination-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

export default OrdersStyle