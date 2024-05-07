import { isEmpty } from "lodash"

export default class InputHelper {}

InputHelper.getErrorByMessage = function(key, error, alter=null) {
  const name = isEmpty(alter) 
    ? key.replace("_", " ") 
    : alter

  if (isEmpty(error)) return ""
  if (isEmpty(error.errors)) return ""
  if (isEmpty(error.errors[key]))
    return { state: "is-valid", message: `The ${name} looks good!` }
  
  return { state: "is-invalid", message: error.errors[key] }
}
InputHelper.getErrorByName = function(error, key, alter=null) {
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