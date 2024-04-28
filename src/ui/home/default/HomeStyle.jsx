import { createGlobalStyle } from "styled-components"

const HomeStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: max-content max-content;
  grid-template-areas: 
    "title-container title-container title-container title-container"
    "trend-1 trend-2 trend-3 trend-4";
}
.title-container {
  grid-area: title-container;
}
.trend-1 {
  grid-area: trend-1;
}
.trend-2 {
  grid-area: trend-2;
}
.trend-3 {
  grid-area: trend-3;
}
.trend-4 {
  grid-area: trend-4;
}
`

export default HomeStyle