import { ProductCategoriesData } from "../Config.jsx"

export default class ProductCategory {
  static BEVERAGES = 1
  static POWDER = 2
  static DAIRY = 3
  static GOODS = 4

  static toCategory = (key) => {
    const category = ProductCategoriesData.find((category) => category.key == key)

    if (!category) return "N/A"
    
    return category.name
  }
}