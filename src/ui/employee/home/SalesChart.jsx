/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from "react-chartjs-2"
import { debounce, isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import OptionInput from "../../common/inputs/OptionInput.jsx"
import { setInterval } from "../../redux/homeSlice.js"
import { useCallback, useEffect, useState } from "react"
import { DELAY_MILLIS, IntervalsData } from "../../../util/Config.jsx"
import { checkSummariesSales } from "../../../util/helper.js"
import { useFetchSummariesSalesQuery } from "../../../data/services/summaries.js"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { HomeCard } from "../../common/index.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = { responsive: true, maintainAspectRatio: false }

function SalesChart() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.home)
  const [sqtemp, setSqtemp] = useState(sq.interval)

  const { isLoading, isFetching, isError, data } = useFetchSummariesSalesQuery(sqtemp)

  const sales = checkSummariesSales(data)

  const labels = isEmpty(sales) ? [] : Object.keys(sales)
  const values = isEmpty(sales) ? [] : Object.values(sales)

  const label = {
    "weekly": "Weekly Sales",
    "monthly": "Monthly Sales",
    "yearly": "Yearly Sales"
  }
  const description = {
    "weekly": "Your sales from this week",
    "monthly": "Your sales from this month",
    "yearly": "Your sales from this year"
  }
  const datasets = [
    {
      label: label[sq.interval],
      data: values,
      borderColor: "rgba(0, 0, 0, 0.9)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      tension: 0.3
    }
  ]
  
  const debouncer = useCallback(debounce((interval) => {
    setSqtemp(interval)
  }, DELAY_MILLIS), [])

  const handleChange = (interval) => {
    dispatch(setInterval(interval))
  }

  useEffect(() => {
    debouncer(sq)
  }, [sq])

  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      title="Sales Chart"
      description={description[sq.interval]}
      actions={
        <OptionInput 
          name="interval" 
          options={IntervalsData}
          size="sm"
          value={sq.interval} 
          onChange={handleChange}
        />
      }
    >
      <Line
        options={options} 
        data={{ labels, datasets: datasets }} 
      />
    </HomeCard>
  )
}

export default SalesChart