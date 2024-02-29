import prototypes from "../prototypes.js"

prototypes.init()

export default class StringHelper {}

StringHelper.isDashboardSidebarItemActive = function(bool) {
    return bool ? "btn-dark" : "btn-secondary"
}
StringHelper.isFormControlInvalid = function(errorMessage) {
    return errorMessage.isNotEmpty() ? "is-invalid" : ""
}
StringHelper.extractMessageFromError = function(error) {
    if (error == null || error == undefined) {
        return ""
    }

    if (error.message == null || error.message == undefined) {
        return ""
    }

    return error.message
}