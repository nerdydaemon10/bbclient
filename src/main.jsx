import React from "react"
import ReactDOM from "react-dom/client"
import store from "./ui/redux/store.jsx"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import "./ui/assets/css/bootstrap.min.css"
import "./ui/assets/css/index.css"
import "./ui/assets/css/bootstrap.min.custom.css"
import "./ui/assets/css/components/components.css"
import "./ui/assets/js/popper.min.js"
import "./ui/assets/js/bootstrap.min.js"

import App from "./App.jsx"
import { IconContext } from "react-icons"
import { SnackbarProvider } from "notistack"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <IconContext.Provider value={{ className: "react-icons" }}>
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