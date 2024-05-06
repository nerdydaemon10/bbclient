import { createGlobalStyle } from "styled-components";

const CustomersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-container"
    "filtering-container"
    "table-container"
    "table-pagination-container";
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
.table-pagination-container {
  grid-area: table-pagination-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

export default CustomersStyle