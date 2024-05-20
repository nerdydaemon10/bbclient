import { last } from "lodash"

export function isSelected(route, current) {
  return route == current
}
export function currentRoute(location) {
  const routes = location.pathname.split("/")
  return last(routes)
}