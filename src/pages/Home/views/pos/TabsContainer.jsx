import AppOption from "../../../../components/inputs/AppOption.jsx"

function TabsContainer({tabs, tab, onChange}) {
  return (
    <div className="tabs-container">
      <AppOption
        name="tab"
        items={tabs}
        value={tab}
        onChange={onChange}
      />
    </div>
  )
}

export default TabsContainer