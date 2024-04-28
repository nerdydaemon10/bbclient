import client from "../../util/client.js"
import ObjectHelper from "../../util/helpers/ObjectHelper.js"

export default class SaleService {}

SaleService.exportToExcel = async function() {
  const response = await client.get('/admin/export')
  return response.data
}

SaleService.findAll = async function(sq=null) {
  const customSq = sq ? {
    created_at: `${sq.date_start},${sq.date_end}`,
    "user.full_name": sq["user.full_name"],
    "customer.full_name": sq["customer.full_name"],
    status: sq.status,
    payment_method: sq.payment_method,
    per_page: sq.per_page, 
    page: sq.page
  } : null
  
  const params = ObjectHelper.toUriParams(customSq) 
  const response = await client.get(`/admin/sales?${params}`)

  return response.data
}