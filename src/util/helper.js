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
  const number = Number(arg)
  const locales = "en-PH"
  const options = { style: "currency", currency: "PHP" }

  return number.toLocaleString(locales, options)
}
export const toStocks = (arg) => {
  const number = Number(arg)

  if (number == 1) return `${number} stock`
  if (number > 1) return `${number} stocks`

  return "No Stocks"
}
export const toItems = (integer) => {
  const number = Number(integer)

  if (number == 0) return "No Items"
  if (number == 1) return `${number} Item`

  return `${number} Items`
}
export const toQty = (integer) => {
  const number = Number(integer)

  if (number == 0) return "No Items"

  return `${number}qty`
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
  const excludes = ["role"]
  
  const entries = isEmpty(sq) ? [] : Object.entries(sq)
  const params = entries
    .filter(([key, value]) => !excludes.includes(key))
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
  const srp = Number(checkout.srp)
  const quantity = Number(checkout.quantity)
  
  return srp * quantity
}
export const computeCheckouts = (checkouts) => {
  return isEmpty(checkouts)
    ? 0.00
    : checkouts.reduce((accum, checkout) => 
      accum + computeCheckout(checkout), 
      0.00
    )
}
export const computeSales = (sales) => {
  return isEmpty(sales)
    ? 0.00
    : sales.reduce((accum, sale) => 
      accum + computeCheckouts(sale.checkouts), 
      0.00
    )
}
export const computeQty = (checkouts) => {
  return isEmpty(checkouts)
    ? 0
    : checkouts.reduce((accum, checkout) =>  accum + checkout.quantity, 0)
}