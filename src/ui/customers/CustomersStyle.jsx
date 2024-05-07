import { createGlobalStyle } from "styled-components";

const CustomersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-section"
    "table-filtering"
    "table-content"
    "table-pagination";
}
/* --TITLE-SECTION-- */
.title-section {
  grid-area: title-section;
}
/*--TABLE-FILTERING--*/
.table-filtering {
  grid-area: table-filtering;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/*--TABLE-CONTENT--*/
.table-content {
  grid-area: table-content;
  overflow: auto !important;
}
/* --TABLE-PAGINATION-- */
.table-pagination {
  grid-area: table-pagination;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

export default CustomersStyle