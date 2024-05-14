import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
.title-sction {
  grid-area: title;
}
/*--TABLE-FILTER--*/
.table-filter {
  grid-area: table-filter;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/*--TABLE-DATA-*/
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}
/* --TABLE-PAGINATION- */
.table-pagination {
  grid-area: table-pagination;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

export default GlobalStyle