export default class ProductRoutes {
    static CREATE = `${import.meta.env.VITE_BASE_URL}/products`
    static REMOVE = `${import.meta.env.VITE_BASE_URL}/products/{{id}}`
    static PUT = `${import.meta.env.VITE_BASE_URL}/products/{{id}}`
    static FIND_ALL = `${import.meta.env.VITE_BASE_URL}/products`
}