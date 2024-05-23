import { createGlobalStyle } from "styled-components"

const LoginStyle = createGlobalStyle`
.login-grid {
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "nav-top"
    "navbar"
    "main"
    "footer";
}
.nav-top {
  grid-area: nav-top;
  background-color: var(--bs-dark);
}
.navbar {
  grid-area: navbar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
  background-color: var(--bs-gray-800);
}
.login-form {
  width: 20%;
  min-width: 300px;
  max-width: 300px;
}
`

export default LoginStyle