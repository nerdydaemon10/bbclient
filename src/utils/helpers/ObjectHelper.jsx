import StringHelper from "./StringHelper.jsx"

export default class ObjectHelper {}

ObjectHelper.toUriParams = function(object) {
  const excludes = ["per_page", "page"]
  const entries = !object ? [] : Object.entries(object)

  const filters = entries
    .filter(([key, value]) => !StringHelper.isEmpty(value) && !excludes.includes(key))
    .map(([key, value]) => `filter[${key}]=${encodeURIComponent(value)}`)
    
  const paginations = entries
    .filter(([key, value]) => !StringHelper.isEmpty(value) && excludes.includes(key))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
         
  const params = filters.concat(paginations).join("&")

  return params
}

