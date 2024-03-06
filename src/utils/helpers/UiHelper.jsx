import UiStatus from "../classes/UiStatus.jsx"

export default class UiHelper {}

UiHelper.isShown = function(condition) {
  return condition ? "is-shown" : ""
}
UiHelper.isInvalid = function(condition) {
  return condition ? "is-invalid" : ""
}
UiHelper.isLoading = function(status) {
  return status == UiStatus.LOADING ? "is-loading" : ""
}
UiHelper.setDisabledByStatusCases = function(status, statuses) {
  return statuses.includes(status) ? true : false
}