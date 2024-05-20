import SalesChart from "./SalesChart.jsx"
import CriticalStocks from "./CriticalStocks.jsx"
import OthersChart from "./OthersChart.jsx"
import OrdersChart from "./OrdersChart.jsx"

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