import { createGlobalStyle } from "styled-components"

const InventoryStyle = createGlobalStyle`
.dashboard-main {
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content 1fr max-content;
    grid-template-areas: 
      "title-container"
      "filtering-container"
      "table-container"
      "pagination-container";
}

.title-container {
    grid-area: title-container;
}
.filtering-container {
    grid-area: filtering-container;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}`

export default InventoryStyle