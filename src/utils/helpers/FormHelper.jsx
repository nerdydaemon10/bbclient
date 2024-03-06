export function findErrorByName(error, name) {
    if (!error) {
        return ""
    }
    if (!error.errors) {
        return ""
    }
    if (!error.errors[name]) {
        return ""
    }

    return error.errors[name]
}