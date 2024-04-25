import { createGlobalStyle } from "styled-components"

const SalesStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content 1fr 1fr max-content;
  grid-template-areas: 
    "title-container title-container"
    "table-container filtering-container"
    "table-container filtering-container"
    "pagination-container receipt-list";
}

.title-container {
  grid-area: title-container;
}
.filtering-container {
  grid-area: filtering-container;
}
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}
.pagination-container {
  grid-area: pagination-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.receipt-list {
  grid-area: receipt-list;
}
`

export default SalesStyle