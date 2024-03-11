export default class DashboardHelper {}

DashboardHelper.isSelectedRoute = function(currentRoute, itemRoute) {
    const lastIndex = currentRoute.lastIndexOf("/")
    const isLastIndex = (lastIndex === currentRoute.length - 1) && (lastIndex !== 0)
    const formattedRoute = isLastIndex ? currentRoute.substring(0, lastIndex) : currentRoute
    
    return formattedRoute === itemRoute ? "btn-dark" : "btn-secondary"
}