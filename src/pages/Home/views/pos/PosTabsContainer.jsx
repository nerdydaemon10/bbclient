import AppOption from "../../../../components/inputs/AppOption.jsx"

function PosTabsContainer({tabs, tab, onChange}) {
  return (
    <div className="pos-tabs-container">
      <AppOption
        name="tab"
        items={tabs}
        value={tab}
        onChange={onChange}
      />
    </div>
  )
}

export default PosTabsContainer