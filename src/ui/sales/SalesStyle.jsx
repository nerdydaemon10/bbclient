import { createGlobalStyle } from "styled-components"

const SalesStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 320px;
  grid-template-rows: max-content 1fr 1fr max-content;
  grid-template-areas: 
    "title-container title-container"
    "table-container side-container"
    "table-container side-container"
    "pagination-container receipt-list";
}

.title-container {
  grid-area: title-container;
}
.side-container {
  grid-area: side-container;
  overflow-x: hidden;
  overflow-y: auto;
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