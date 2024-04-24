import { ProductCategoriesData } from "../Config.jsx"

export default class StringHelper {}

StringHelper.truncate = function (text, max=24) {
  if (!text) {
    return ""
  }
  const length = text.length
  const exceed = length > max

  if (exceed) {
    return text.slice(0, max - 3) + '...';
  }

  return text
}
StringHelper.toStocks = function(number) {
    if (number == 1) {
        return `${number} stock`
    }
    if (number > 1) {
        return `${number} stocks`
    }
    return `Empty Stock`
}
StringHelper.toPcs = function(number) {
  if (number == 1) {
      return `${number}pc`
  }
  if (number > 1) {
      return `${number}pcs`
  }
  return "No Items"
}
StringHelper.toPesoCurrency = function(number) {
    return number.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
}
StringHelper.toPeso = function(number) {
    return number.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
}
StringHelper.isEmpty = function(arg) {
  if (!arg) {
    return true
  }

  const str = arg.toString()
  const length = str.replace(" ", "").length
  
  return length == 0
}

StringHelper.notEmpty = function(arg) {
  return !StringHelper.isEmpty(arg)
}

StringHelper.capitalize = function(string) {
  if (!string) {
    return ""
  }
  
  return string[0].toUpperCase() + string.slice(1)
}