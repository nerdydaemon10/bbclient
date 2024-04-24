import moment from "moment"

export default class DateHelper {}

DateHelper.toIsoStandard = function(dateString) {
  return moment(dateString).format("YYYY-MM-DD")
}