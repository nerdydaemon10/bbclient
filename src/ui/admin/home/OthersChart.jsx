import { Bar } from "react-chartjs-2"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries } from "../../../util/helper.js"
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
} from "chart.js"
import { HomeCard } from "../../common/index.jsx"

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
  const { products, customers, employees } = summaries.counts
  const { admin, employee} = employees

  const labels = [
    `Products (${products})`,
    `Customers (${customers})`,
    `Admins (${admin})`,
    `Employees (${employee})`,
  ]
  const datasets = [
    {
      data: [products, customers, admin, employee],
      backgroundColor: "rgb(0, 0, 0)",
      borderRadius: 6
    }
  ]
  const isEmpty = (products == 0) && 
                  (customers == 0) && 
                  (admin == 0) &&
                  (employee == 0)
                  
  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      isEmpty={isEmpty}
      title="Others Chart"
      description="Total of different entities"
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