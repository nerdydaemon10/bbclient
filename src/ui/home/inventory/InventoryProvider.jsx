import { useState } from "react"

import InventoryContext from "./InventoryContext.jsx"
import { productCategories } from "../../../utils/Configs.jsx"

function InventoryProvider({children}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [product, setProduct] = useState(null)
  const [createParam, setCreateParam] = useState({
    name: "",
    description: "",
    category_id: productCategories[0].id,
    quantity: "",
    srp: "",
    member_price: ""
  })

  const resetCreateParam = () => {
    setCreateParam({
      name: "",
      description: "",
      category_id: productCategories[0].id,
      quantity: "",
      srp: "",
      member_price: ""
    })
  }

  return (
    <InventoryContext.Provider value={{
      isCreateModalOpen, setIsCreateModalOpen,
      isUpdateModalOpen, setIsUpdateModalOpen,
      isRemoveDialogOpen, setIsRemoveDialogOpen,
      createParam, setCreateParam, resetCreateParam,
      product, setProduct
    }}>
      {children}
    </InventoryContext.Provider>
  )
}

export default InventoryProvider