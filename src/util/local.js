import { isEmpty, isNil } from "lodash"

function get(key) {
	const stringify = localStorage.getItem(key)
	
	if (isNil(stringify)) return null
	if (isEmpty(stringify)) return null
	
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