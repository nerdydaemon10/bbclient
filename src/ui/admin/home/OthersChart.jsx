/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js"

import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries } from "../../../util/helper.js"
import HomeCard from "./HomeCard.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  
  const labels = [
    `Products (${summaries.counts.products})`,
    `Customers (${summaries.counts.customers})`,
    `Admins (${summaries.counts.employees.admin})`,
    `Employees (${summaries.counts.employees.employee})`,
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
          datasets: [
            {
              data: [summaries.counts.products, summaries.counts.customers, summaries.counts.employees.admin, summaries.counts.employees.employee],
              backgroundColor: "rgb(0, 0, 0)",
              borderRadius: 6
            }
          ]
        }}
      />
    </HomeCard>
  )
}

export default OthersChart