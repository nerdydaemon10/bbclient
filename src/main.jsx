import React from "react"
import ReactDOM from "react-dom/client"
import store from "./ui/redux/store.js"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import './ui/assets/index.css'
import "./ui/assets/vendor/bootstrap-5.3.3/css/bootstrap.css"
import "./ui/assets/vendor/popperjs-2.11.8/popper.min.js"
import "./ui/assets/vendor/bootstrap-5.3.3/js/bootstrap.js"
import './ui/assets/custom.css'
import './ui/assets/app.css'

import App from "./ui/App.jsx"
import { IconContext } from "react-icons"
import { SnackbarProvider } from "notistack"

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