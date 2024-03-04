import { createContext, useState } from "react"

const SidebarContext = createContext()

function SidebarProvider({children}) {
  const [currentSidebarItem, setCurrentSidebarItem] = useState("")
}