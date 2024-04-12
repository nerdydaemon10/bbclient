import { productCategories } from "../Config.jsx"

export default class ProductCategory {
  static BEVERAGES = 1
  static POWDER = 2
  static DAIRY = 3
  static GOODS = 4

  static toCategory = (id) => {
    const category = productCategories.find((category) => category.id == id)

    if (!category) {
        return "N/A"
    }
    
    return category.name
  }
}