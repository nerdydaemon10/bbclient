import { last } from "lodash"

export function isSelected(route, current) {
  /*
  const index = current.lastIndexOf("/")
  const hasSlash = (index === current.length - 1) && (index !== 0)
  const formatted = hasSlash ? current.substring(0, hasSlash) : current
  
  return route == formatted
  */
  return route == current
}

export function currentRoute(location) {
  const excludes = ["checkouts"]
  const routes = location.pathname.split("/").filter(route => !excludes.includes(route))
  return last(routes)
}