import { createGlobalStyle } from "styled-components"

const SalesStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content 1fr 1fr max-content;
  grid-template-areas: 
    "title-container title-container"
    "table-container filtering-container"
    "table-container filtering-container"
    "pagination-container total-container";
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
.total-container {
  grid-area: total-container;
  border: 1px dashed var(--app-main-color);
  border-radius: var(--bs-border-radius);
  background-color: #F9FAFA;
}
.total-item {
  font-size: 1rem;
  border-bottom: 1px dashed var(--app-main-color);
}
.total-item:last-child {
  border-bottom: none;
}
.total-item-name {
  color: var(--app-main-color);
  font-size: inherit;
  font-weight: 400;
  margin: 0;
  line-height: 1;
}
.total-item-value {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  line-height: 1;
}
`

export default SalesStyle