/* eslint-disable react-hooks/exhaustive-deps */
import { Doughnut } from "react-chartjs-2"
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

import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries } from "../../../util/helper.js"
import HomeCard from "./HomeCard.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
}

function OrdersChart() {
  const { isLoading, isFetching, isError, data, error  } = useFetchSummariesQuery()
  const summaries = checkSummaries(data)
  const labels = [
    `Pending (${summaries.counts.orders.pending})`,
    `Approved (${summaries.counts.orders.approved})`,
    `Rejected (${summaries.counts.orders.rejected})`,
  ]

  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      title="Orders Chart"
      description="Please add some descriptions..."
      error={error}
    >
      <Doughnut
        options={options}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Orders",
              data: [summaries.counts.orders.pending, summaries.counts.orders.approved, summaries.counts.orders.rejected],
              backgroundColor: ["#F0F0F0", "#212529", "#6C757D"],

            }
          ]
        }}
      />
    </HomeCard>
  )
}

export default OrdersChart