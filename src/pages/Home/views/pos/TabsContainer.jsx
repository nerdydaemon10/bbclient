import { useContext } from "react"
import AppOption from "../../../../components/inputs/AppOption.jsx"
import PosTabs from "../../../../utils/configs/PosCheckoutTabs.jsx"
import PosContext from "../../../../contexts/PosContext.jsx"

function TabsContainer() {
  const { tab, setTab } = useContext(PosContext)
  
  const handleChange = (value) => {
    setTab(value)
  }
  
  return (
    <div className="tabs-container">
      <AppOption
        name="tab"
        items={PosTabs}
        value={tab}
        onChange={handleChange}
      />
    </div>
  )
}

export default TabsContainer