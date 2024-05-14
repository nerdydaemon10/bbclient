import { createGlobalStyle } from "styled-components";

const CustomersStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-section"
    "table-filter"
    "table-data"
    "table-pagination";
}
/* --TITLE-SECTION- */
.title-section {
  grid-area: title-section;
}
/*--TABLE-FILTER--*/
.table-filter {
  grid-area: table-filter;
}
/*--TABLE-DATA-*/
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}
/* --TABLE-PAGINATION- */
.table-pagination {
  grid-area: table-pagination;
}`

export default CustomersStyle