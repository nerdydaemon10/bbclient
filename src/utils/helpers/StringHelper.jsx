import { productCategories } from "../Configs.jsx"

export default class StringHelper {}

StringHelper.truncate = function (text, max=24) {
    const length = text.length
    const exceed = length > max

    if (exceed) {
        return text.slice(0, max - 3) + '...';
    }

    return text
}
StringHelper.isDashboardSidebarItemActive = function(bool) {
    return bool ? "btn-dark" : "btn-secondary"
}
StringHelper.isFormControlInvalid = function(errorMessage) {
    return StringHelper.notEmpty(errorMessage) ? "is-invalid" : ""
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
StringHelper.toProductCategoryName = function(id) {
    const category = productCategories.find((product) => product.id == id)

    if (!category) {
        return "Undefined"
    }

    return category.name
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