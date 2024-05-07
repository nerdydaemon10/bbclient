import { last } from "lodash"

export function isSelected(route, current) {
  return route == current
}
export function currentRoute(location) {
  const excludes = ["checkouts"]
  const routes = location.pathname.split("/").filter(route => !excludes.includes(route))
  return last(routes)
}