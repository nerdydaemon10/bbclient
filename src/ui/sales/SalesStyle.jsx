import { createGlobalStyle } from "styled-components"

const SalesStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr var(--dashboard-side-width);
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas: 
    "title-section title-section"
    "table-data sales-side"
    "table-pagination receipt-list";
}

.title-section {
  grid-area: title-section;
}
.sales-side {
  grid-area: sales-side;
  overflow-x: hidden;
  overflow-y: auto;
}
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}
.table-pagination {
  grid-area: table-pagination;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.receipt-list {
  grid-area: receipt-list;
}
`

export default SalesStyle