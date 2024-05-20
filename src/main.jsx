import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { IconContext } from "react-icons"
import { SnackbarProvider } from "notistack"
import store from "./ui/redux/store.js"

import "./ui/assets/index.css"
import "./ui/assets/vendor/bootstrap-5.3.3/css/bootstrap.css"
import "./ui/assets/custom.css"
import "./ui/assets/common.css"

import App from "./ui/App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <IconContext.Provider value={{ className: "react-icon" }}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <App />
          </SnackbarProvider>
        </IconContext.Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)