import { useContext } from "react"
import AppOption from "../../components/inputs/AppOption.jsx"
import { posTabs } from "./Util.jsx"
import { PosContext } from "./PosProvider.jsx"

function TabsContainer() {
  const { tab, setTab } = useContext(PosContext)

  const handleChange = (value) => {
    setTab(value)
  }
  
  return (
    <div className="tabs-container">
      <AppOption
        name="tab"
        items={posTabs}
        value={tab}
        onChange={handleChange}
      />
    </div>
  )
}

export default TabsContainer