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
export const ActionResponse = (config) => {
  const { state } = config

  if (state == "pending")
    return { isLoading: true, isSuccess: false, data: null, error: null }
  if (state == "fulfilled")
    return { isLoading: false, isSuccess: true, data: config.payload, error: null }
  if (state == "rejected")
    return { isLoading: false, isSuccess: false, data: null, error: config.payload }
  // Idle
  return { isLoading: false, isSuccess: false, data: null, error: null }
}

const buildDataResponse = (config) => {
  const { state } = config

  if (state == "pending")
    return { isLoading: true, isLoaded: false, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
  if (state == "fulfilled")
    return { isLoading: false, isLoaded: true, data: config.payload.data, meta: config.payload.meta, error: null }
  if (state == "rejected")
    return { isLoading: false, isLoaded: false, data: [], meta: { current_page: 0, last_page: 0 }, error: config.payload }

  // Idle
  return { isLoading: false, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
}