import { createGlobalStyle } from "styled-components";

const EmployeesStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-section"
    "table-filtering"
    "table-content"
    "table-pagination";
}

/* --TITLE-CONTAINER-- */
.title-container {
  grid-area: title-container;
}

/* --TABLE-FILTERING-- */
.table-filtering {
  grid-area: table-filtering;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --TABLE-CONTENT-- */
.table-content {
  grid-area: table-content;
  overflow: auto !important;
}

/* --TABLE-PAGINATION-- */
.table-pagination {
  grid-area: table-pagination;
}`

export default EmployeesStyle