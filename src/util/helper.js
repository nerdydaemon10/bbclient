import { isEmpty } from "lodash"
import moment from "moment"

// String
export const truncate = (string, max=30) => {
  if (!string) {
    return ""
  }

  const length = string.length
  const exceed = length > max

  if (exceed) 
    return string.slice(0, max - 3) + "..."

  return string
}
export const toPeso = (arg) => {
  const locales = "en-PH"
  const options = { style: "currency", currency: "PHP" }

  // if (isEmpty(arg)) return "0.00".toLocaleString(locales, options)
  // if (isNaN(arg)) return "0.00".toLocaleString(locales, options)

  return arg.toLocaleString(locales, options)
}
export const toStocks = (arg) => {
  const number = Number(arg)

  if (number == 1) return `${number} stock`
  if (number > 1) return `${number} stocks`

  return "No Stocks"
}
export const toPcs = (integer) => {
  const number = Number(integer)

  if (number == 1) return `${number}pc`
  if (number > 1) return `${number}pcs`

  return "No Items"
}
export const toCount = (arg, max=999) => {
  const number = Number(arg)
  
  if (number == 0) return "0"
  if (number > max) return `${max}+`

  return number
}

// Error
export const getError = (error) => {
  if (isEmpty(error)) return ""
  if (isEmpty(error.data)) return ""
  if (isEmpty(error.data.message)) return ""

  return error.data.message
}
export const getErrorByName = (error, key, alter=null) => {
  const name = isEmpty(alter) 
    ? key.replace("_", " ") 
    : alter

  if (isEmpty(error)) return ""
  if (isEmpty(error.data)) return ""
  if (isEmpty(error.data.errors)) return ""
  if (isEmpty(error.data.errors[key]))
    return { state: "is-valid", message: `The ${name} looks good!` }

  return { state: "is-invalid", message: error.data.errors[key] }
}

// Date
export const toDate = (dateString) => {
  if (isEmpty(dateString)) return "N/A"
  return moment(dateString).format("MMM, DD YYYY")
}
export const toDateTime = (dateString) => {
  if (isEmpty(dateString)) return "N/A"
  return moment(dateString).format("MMM, DD YYYY, h:mm a")
}

// Object
export const params = (sq) => {
  const entries = isEmpty(sq) ? [] : Object.entries(sq)
  
  const params = entries
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

  return params.join("&")
}

// Compare
export function isEntitySelected(entity, entity2) {
  if (isEmpty(entity)) return false
  if (isEmpty(entity2)) return false

  return entity.id == entity2.id
}
export const compareEntity = (entity, entity2) => {
  if (isEmpty(entity)) return false
  if (isEmpty(entity2)) return false

  return entity.id == entity2.id
}

// Computation

export const computeCheckout = (checkout) => {
  return checkout.srp * checkout.quantity
}
export const computeCheckouts = (checkouts) => {
  return isEmpty(checkouts)
    ? 0.00
    : checkouts.reduce((accum, checkout) => 
        accum + computeCheckout(checkout), 
        0.00
      )
}