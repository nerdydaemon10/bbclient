export default class AppLocalStorage {}

AppLocalStorage.read = function(key) {
    const data = localStorage.getItem(key)
    return data == null || data == undefined ? null : data
}
AppLocalStorage.readUser = function() {
    const userJson = AppLocalStorage.read("user")
    const userObject = JSON.parse(userJson)
    
    return userObject
}
AppLocalStorage.readAccessToken = function() {
    return AppLocalStorage.read("accessToken")
}

AppLocalStorage.save = function(key, data) {
    //localStorage.removeItem(key)
    localStorage.setItem(key, data)
}
AppLocalStorage.saveUser = function(user) {
    const userJson = JSON.stringify(user)
    AppLocalStorage.save("user", userJson)
}
AppLocalStorage.saveAccessToken = function(accessToken) {
    AppLocalStorage.save("accessToken", accessToken)
}

AppLocalStorage.clear = function() {
    localStorage.clear()
}