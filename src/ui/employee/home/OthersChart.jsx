/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from "react-chartjs-2"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries } from "../../../util/helper.js"
import HomeCard from "./HomeCard.jsx"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

function OthersChart() {
  const { isLoading, isFetching, isError, data, error } = useFetchSummariesQuery()
  const summaries = checkSummaries(data)
  const { products, customers } = summaries.counts

  const labels = [
    `Products (${products})`,
    `Customers (${customers})`,
  ]
  const datasets = [
    {
      data: [products, customers],
      backgroundColor: "rgb(0, 0, 0)",
      borderRadius: 6
    }
  ]

  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      title="Entities Chart"
      description="List of entities"
      error={error}
    >
      <Bar
        options={options}
        data={{
          labels: labels,
          datasets: datasets
        }}
      />
    </HomeCard>
  )
}

export default OthersChart