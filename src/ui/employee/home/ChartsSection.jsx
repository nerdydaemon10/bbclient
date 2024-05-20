import SalesChart from "./SalesChart.jsx"
import CriticalStocks from "./CriticalStocks.jsx"
import OrdersChart from "./OrdersChart.jsx"
import OthersChart from "./OthersChart.jsx"

function ChartsSection() {
  return (
    <div className="charts-section d-grid gap-2">
      <SalesChart />
      <CriticalStocks />
      <OthersChart />
      <OrdersChart />
    </div>
  )
}

export default ChartsSection