function get(key) {
	const stringify = localStorage.getItem(key)
	return JSON.parse(stringify)
}
function set(key, value) {
	const stringify = JSON.stringify(value)
	localStorage.setItem(key, stringify)
}
function clear() {
	localStorage.clear()
}

export default { get, set, clear }