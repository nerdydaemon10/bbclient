import { isEmpty } from "lodash"
import StringHelper from "./helpers/StringHelper.js"

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

function noSearchResults(sq, data) {
  const entries = Object.entries(sq)

  if (!data)
    return false

  if (data.length > 0)
    return false
  
  const hasValues = entries.some((_, value) => {    
    if (!isEmpty(value)) {
      return true
    }
  })

  return hasValues ? hasValues : false
}

export { noSearchResults }