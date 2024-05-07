import { isEmpty } from "lodash"

export const columns = ["Ref. Number", "Amount Due", "Total Items", "Order Status", "Payment Method", "Customer", "Salesperson", "Commission", "Date Ordered"]
export const hasSelectedUser = (sq) => !isEmpty(sq.employee_id)