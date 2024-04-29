import client from "../../util/client.js"

export default class SaleService {}

SaleService.exportAsExcel = async function(sq=null) {
  const params = sq ? {
    start_date: sq.date_start,
    end_date: sq.date_end,
    employee: sq["user.full_name"],
    customer: sq["customer.full_name"],
    status: sq.status,
    payment_method: sq.payment_method
  } : null

  const response = await client.get('/admin/export', { responseType: "blob", params: params})
  return response.data
}

SaleService.findAll = async function(sq=null) {
  const params = sq ? {
    start_date: sq.date_start,
    end_date: sq.date_end,
    employee: sq["user.full_name"],
    customer: sq["customer.full_name"],
    status: sq.status,
    payment_method: sq.payment_method,
    per_page: sq.per_page, 
    page: sq.page
  } : null

  const response = await client.get(`/admin/sales`, { params: params })

  return response.data
}