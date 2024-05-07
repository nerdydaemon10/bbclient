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
StringHelper.toCount = function(number, max=999) {
  if (number == 0) return "0"
  if (number > max) return `${max}+`

  return number
}
StringHelper.toPesoCurrency = function(str) {
  const number = Number(str)
  return number.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
}