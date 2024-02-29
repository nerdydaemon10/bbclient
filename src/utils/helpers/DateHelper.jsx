import moment from "moment"

export default class DateHelper {}

DateHelper.toStandardDate = function(dateString) {
    return moment(dateString).format("YYYY-MM-DD")
}