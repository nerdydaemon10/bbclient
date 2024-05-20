import { isEmpty, isNil } from "lodash"
import moment from "moment"
import { CURRENCY, LOCALE } from "./Config.jsx"

// String
export const truncate = (str, max=30) => {
  if (isNil(str)) return ""
  if (isEmpty(str)) return ""
  
  const length = str.length
  const isExceed = length > max

  if (isExceed) return str.slice(0, max - 3) + "..."

  return str
}
export const cut = (str, max=3) => {
  return str.substring(0, max)
}
export const toPeso = (arg) => {
  const number = Number(arg)
  const options = {style: "currency", currency: CURRENCY}

  return number.toLocaleString(LOCALE, options)
}
export const toStocks = (integer) => {
  const number = Number(integer)

  if (number == 0) return "No Stocks"
  if (number == 1) return `${number} Stock`

  return `${number} Stocks`
}
export const toItems = (arg) => {
  const number = Number(arg)

  if (number == 0) return "No Items"
  if (number == 1) return `${number} Item`

  return `${number} Items`
}
export const toQty = (arg) => {
  const number = Number(arg)

  if (number == 0) return "No Items"

  return `${number} qty`
}
export const toCount = (arg, max=999) => {
  const number = Number(arg)

  if (number == 0) return "Empty"
  if (number > max) return `${max}+`

  return number
}

// Error
export const getError = (error) => {
  if (isNil(error)) return ""
  if (isNil(error.data)) return ""
  if (isEmpty(error.data.message)) return ""

  return error.data.message
}
export const getErrorByName = (error, key, alter=null) => {
  const name = isEmpty(alter) 
    ? key.replace("_", " ") 
    : alter

  if (isNil(error)) return ""
  if (isNil(error.data)) return ""
  if (isNil(error.data.errors)) return ""
  if (isEmpty(error.data.errors[key]))
    return { state: "is-valid", message: `The ${name} looks good!` }

  return { state: "is-invalid", message: error.data.errors[key] }
}

// Date
export const toDate = (datestr) => {
  if (isNil(datestr)) return "N/A"
  if (isEmpty(datestr)) return "N/A"

  return moment(datestr).format("MMM, DD YYYY")
}
export const toDateTime = (datestr) => {
  if (isNil(datestr)) return "N/A"
  if (isEmpty(datestr)) return "N/A"

  return moment(datestr).format("MMM, DD YYYY, h:mm a")
}

// Object
export const params = (sq) => {
  const entries = isEmpty(sq) ? [] : Object.entries(sq)
  const params = entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)

  return params.join("&")
}

// Compare
export const compareEntity = (entity, other) => {
  if (isNil(entity)) return false
  if (isNil(other)) return false

  return entity.id == other.id
}

// Computes
export const computeCheckout = (checkout) => {
  const srp = Number(checkout.srp)
  const quantity = Number(checkout.quantity)

  return srp * quantity
}
export const computeCheckouts = (checkouts) => {
  return isEmpty(checkouts)
    ? 0.00
    : checkouts.reduce((accum, checkout) => 
      accum + computeCheckout(checkout), 
      0.00
    )
}
export const computeSales = (sales) => {
  return isEmpty(sales)
    ? 0.00
    : sales.reduce((accum, sale) => 
      accum + computeCheckouts(sale.checkouts), 
      0.00
    )
}
export const computeQty = (checkouts) => {
  return isEmpty(checkouts)
    ? 0
    : checkouts.reduce((accum, checkout) =>  accum + checkout.quantity, 0)
}

// Checks (Fallback)
export const checkMeta = (data) => {
  const fallback = { current_page: 1, last_page: 1 }

  if (isNil(data)) return fallback
  if (isNil(data.meta)) return fallback

  return data.meta
}
export const checkUser = (user) => {
  const fallback = { id: 0, full_name: "", role: "" }

  if (isNil(user)) return fallback
  
  return user
}
export const checkSummaries = (data) => {
  const fallback = {
    sales: {
      overall: 0.00,
      today: 0.00
    },
    counts: {
      customers: 0,
      products: 0,
      orders: { pending: 0, approved: 0, rejected: 0},
      employees: { all: 0, admin: 0, employee: 0 }
    },
    charts: {
      sales: [],
      products: []
    }
  }

  return isNil(data) ? fallback : data
}
export const checkSummariesCounts = (data) => {
  const fallback = {
    orders: 0,
    inventory: 0,
    customers: 0,
    employees: 0
  }

  return isNil(data) ? fallback : {
    orders: data.counts.orders.pending,
    inventory: data.counts.products,
    customers:  data.counts.customers,
    employees: isNil(data.counts.employees) ? 0 : data.counts.employees.all
  }
}
export const checkSummariesSales = (data) => {
  const fallback = []
  return isNil(data) ? fallback : data
}