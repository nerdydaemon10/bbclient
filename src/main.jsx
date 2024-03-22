import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './assets/css/bootstrap.min.css'
import './assets/css/index.css'
import './assets/css/bootstrap.min.custom.css'
import './assets/css/components/components.css'

import App from './App.jsx'
import inits from './utils/inits.jsx'
import { IconContext } from 'react-icons'
import { SnackbarProvider } from 'notistack'

inits()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <App />
          </SnackbarProvider>
        </IconContext.Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)