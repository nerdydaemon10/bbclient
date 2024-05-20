import { createGlobalStyle } from "styled-components"

const HomeStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas: 
    "title-section"
    "cards-section"
    "charts-section";
  overflow-y: auto !important;
}
.title-section {
  grid-area: "title-section";
}
.cards-section {
  grid-area: "cards-section";
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
}
.charts-section {
  grid-area: "charts-section";
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-rows: 468px 468px;
}
`

export default HomeStyle