/* eslint-disable react-hooks/exhaustive-deps */
import { Doughnut } from "react-chartjs-2"

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
  ArcElement,
} from "chart.js"
import { HomeCard } from "../../common/index.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false
}

function OrdersChart() {
  const { isLoading, isFetching, isError, data, error  } = useFetchSummariesQuery()
  const summaries = checkSummaries(data)
  const { pending, approved, rejected} = summaries.counts.orders

  const labels = [
    `Pending (${pending})`,
    `Approved (${approved})`,
    `Rejected (${rejected})`,
  ]
  const datasets = [
    {
      label: "Orders",
      data: [pending, approved, rejected],
      backgroundColor: ["#F0F0F0", "#212529", "#6C757D"],
    }
  ]
  const isEmpty = (pending) == 0 && (approved == 0) && (rejected == 0)

  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      isEmpty={isEmpty}
      name="orders"
      title="Orders Chart"
      description="Total of orders you assisted in different statuses"
      error={error}
    >
      <Doughnut
        options={options}
        data={{
          labels: labels,
          datasets: datasets
        }}
      />
    </HomeCard>
  )
}

export default OrdersChart