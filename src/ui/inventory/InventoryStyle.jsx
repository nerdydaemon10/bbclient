import { createGlobalStyle } from "styled-components"

const InventoryStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-section"
    "table-filter"
    "table-data"
    "table-pagination";
}

.title-section {
  grid-area: title-section;
}
.table-filter {
  grid-area: table-filter;
}
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}
.table-pagination {
  grid-area: table-pagination;
}`

export default InventoryStyle