import prototypes from "../prototypes.jsx"

prototypes.init()

export default class StringHelper {}

StringHelper.isDashboardSidebarItemActive = function(bool) {
    return bool ? "btn-dark" : "btn-secondary"
}
StringHelper.isFormControlInvalid = function(errorMessage) {
    return errorMessage.isNotEmpty() ? "is-invalid" : ""
}
StringHelper.extractErrorsFromError = function(name, error) {
    if (error == null || error == undefined) {
        return ""
    }

    if (error.errors == null || error.errors == undefined) {
        return ""
    }
    
    return error.errors[name] 
}