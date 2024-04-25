import { createGlobalStyle } from "styled-components";

const HomeStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 1fr 0.7fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-container title-container title-container"
    "filtering-container filtering-container tabs-container"
    "table-container table-container tab-container"
    "pagination-container pagination-container place-order-btn-container";
}
`

export default HomeStyle