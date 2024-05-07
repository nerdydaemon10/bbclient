import { createGlobalStyle } from "styled-components"

const HomeStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas: 
    "title-container"
    "trends-container"
    "charts-container"
  overflow-y: auto;
}
.title-container {
  grid-area: "title-container";
}
.trends-container {
  display: grid;
  grid-area: "trends-container";
  grid-template-columns: auto auto auto auto;
}
.charts-container {
  display: grid;
  grid-area: "charts-container";
  grid-template-columns: 0.5fr 0.5fr;
}
`

export default HomeStyle