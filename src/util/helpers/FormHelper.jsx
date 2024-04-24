import StringHelper from "./StringHelper.js"

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