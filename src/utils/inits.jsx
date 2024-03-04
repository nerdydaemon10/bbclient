import axios from "axios"
import AppLocalStorage from "./AppLocalStorage.jsx"

const accessToken = AppLocalStorage.readAccessToken()

function inits() {
    if (accessToken) {
        axios.defaults.headers = { "Authorization": `Bearer ${accessToken}` }
    }
}

export default inits