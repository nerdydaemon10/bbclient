export function findErrorByName(error, name) {
    if (!error) {
        return ""
    }

    if (!error.errors) {
        return ""
    }

    return error.errors[name]
}