import StringHelper from "./helpers/StringHelper.jsx"

export function findErrorByMessage(error) {
  if (!error) {
      return ""
  }
  if (!error.message) {
      return ""
  }

  return error.message
}

export function findErrorByName(error, name, alter="") {
  const capitalize = StringHelper.isEmpty(alter) 
    ? name.replace("_", " ") 
    : alter
    
  if (!error) {
      return ""
  }
  if (!error.errors) {
      return ""
  }

  const entries = Object.entries(error.errors)
  const hasErrors = entries.some(([, messages]) => messages.length > 0)

  if (hasErrors && !error.errors[name]) {
      return { state: "is-valid", message: `The ${capitalize} looks good!`}
  }

  if (!error.errors[name]) {
      return ""
  }
  
  return { state: "is-invalid", message: error.errors[name]}
}

function isSearchHasEmptyResults(searchQuery, data) {
  const entries = Object.entries(searchQuery)

  if (!data) {
    return false
  }

  if (data.length > 0) {
    return false
  }
  
  const hasValues = entries.some((key, value) => {
    if ((typeof value) == "string") {
      return StringHelper.notEmpty(value)
    }
    return true
  })

  return hasValues
}

function isItemsEmpty(items) {
  return !items || items.length == 0
}

export { isSearchHasEmptyResults, isItemsEmpty }