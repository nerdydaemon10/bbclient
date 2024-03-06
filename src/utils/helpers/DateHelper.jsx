import moment from "moment"

export default class DateHelper {}

DateHelper.display = function(dateString) {
    return moment(dateString).format("YYYY-MM-DD")
}