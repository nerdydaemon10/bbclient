export default class DashboardHelper {}

DashboardHelper.isItemActive = function(id, currentId) {
    return id == currentId ? "btn-dark" : "btn-secondary"
}