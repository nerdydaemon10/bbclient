import axios from "axios"
import AppLocalStorage from "./AppLocalStorage.jsx"

const accessToken = AppLocalStorage.readAccessToken()

function inits() {
  if (!accessToken) {
    return
  }
  
  axios.defaults.headers = { 
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/json"
  }
}

export default inits