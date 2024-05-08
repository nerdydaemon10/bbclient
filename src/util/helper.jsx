import { isEmpty } from "lodash"

export function params(sq) {
  const entries = isEmpty(sq) ? [] : Object.entries(sq)

  const params = entries
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

  return params.join("&")
}
export function getErrorMessage(error) {
  if (isEmpty(error)) return ""
  if (isEmpty(error.message)) return ""
  
  return error.message
}
export function findErrorByMessage(error) {
  if (!error) 
    return ""
  if (!error.message)
    return ""
  
  return error.message
}
export function findErrorByName(error, name, alter="") {
  const capitalize = isEmpty(alter) 
    ? name.replace("_", " ") 
    : alter

  if (!error)
    return ""
  if (!error.errors)
    return ""

  const entries = Object.entries(error.errors)
  const hasErrors = entries.some(([, messages]) => messages.length > 0)

  if (hasErrors && !error.errors[name])
    return { state: "is-valid", message: `The ${capitalize} looks good!`}

  if (!error.errors[name])
    return ""
  
  return { state: "is-invalid", message: error.errors[name]}
}
export function noSearchResults(sq, data) {
  const excludes = ["per_page", "page"]
  const entries = Object
    .entries(sq)
    .filter((entry) => !excludes.includes(entry[0]))
  
  if (!data)
    return false

  if (data.length > 0)
    return false

  const hasValues = entries.some((item) => !isEmpty(item[1]))

  return isEmpty(data) && hasValues
}
export function computeProduct(checkout) {
  return checkout.srp * checkout.quantity
}
export function computeSum(checkouts) {
  if (isEmpty(checkouts)) return 0.00
  return checkouts.reduce((accum, checkout) => accum + computeProduct(checkout), 0.00)
}
export function isEntitySelected(item, item2) {
  if (isEmpty(item)) return false
  if (isEmpty(item2)) return false

  return item.id == item2.id
}