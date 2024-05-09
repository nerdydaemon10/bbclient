import { Bar, Line } from "react-chartjs-2"
import { faker } from "@faker-js/faker"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import SalesChart from "./SalesChart.jsx"
import CriticalStocks from "./CriticalStocks.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartsContainer() {
  return (
    <div className="charts-container gap-2">
      <SalesChart />
      <CriticalStocks />
    </div>
  )
}

export default ChartsContainer