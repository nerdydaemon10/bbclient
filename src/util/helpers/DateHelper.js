import { isEmpty } from "lodash"
import moment from "moment"

export default class DateHelper {}

DateHelper.toIsoStandard = function(dateString) {
  if (isEmpty(dateString)) return "N/A"
  return moment(dateString).format("YYYY-MM-DD")
}
DateHelper.toDateTime = function(dateString) {
  if (isEmpty(dateString)) return "N/A"
  return moment(dateString).format("YYYY-MM-DD, h:mm:ss a")
}