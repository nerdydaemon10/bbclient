import { isEmpty } from "lodash"
import moment from "moment"

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
  return (data.length == 0) && hasValues
}
export function download(data, name) {
  const url = URL.createObjectURL(data)
  const link = document.createElement('a')
  
  link.href = url
  link.setAttribute("download", `SALES_REPORT_${moment.now()}.xlsx`)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}