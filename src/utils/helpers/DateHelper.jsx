import moment from "moment"

export default class DateHelper {}

DateHelper.toDisplay = function(dateString) {
    return moment(dateString).format("YYYY-MM-DD")
}

DateHelper.toIsoStandard = function(dateString) {
    return moment(dateString).format("YYYY-MM-DD")
}