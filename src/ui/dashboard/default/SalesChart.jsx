/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from "react-chartjs-2"
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
import { useFetchChartQuery } from "../../../data/services/summaries.js"
import { debounce, isNil } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import OptionInput from "../../common/inputs/OptionInput.jsx"
import { setInterval } from "../../redux/homeSlice.js"
import { useCallback, useEffect, useState } from "react"
import { DELAY_MILLIS, IntervalsData } from "../../../util/Config.jsx"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  tooltip: {
    callbacks: {
      label: (context) => {
        let label = context.dataset.label || ""

        if (label) label += ": "
        if (context.parsed.y !== null) 
          label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.parsed.y)
        return label
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: function(value) {
            return value.toLocaleString("en-PH",{style:"currency", currency:"PHP"})
        }
      }
    }
  },
}

function SalesChart() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.home)
  const [sqtemp, setSqtemp] = useState(sq.interval)

  const { isLoading, isFetching, data } = useFetchChartQuery(sqtemp)

  const labels = isNil(data) ? [] : Object.keys(data)
  const values = isNil(data) ? [] : Object.values(data)

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
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="card-title fs-7 mb-0">
          Total Sales
        </h6>
        <OptionInput 
          name="interval" 
          options={IntervalsData}
          size="sm"
          value={sq.interval} 
          onChange={handleChange}
        />
      </div>
      <div className="card-body">
        {
          isLoading || isFetching ? (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <p className="fs-7 mb-0">
                <span className="spinner-border spinner-border-sm me-1"></span>
                Fetching Sales, Please Wait...
              </p>
            </div>
          ) : data ? (
            <Line
              options={options} 
              data={{
                labels,
                datasets: [
                  {
                    label: "Total Sales",
                    data: values,
                    borderColor: "rgb(50, 50, 50)",
                    backgroundColor: "rgba(40, 44, 52, 0.5)",
                    tension: 0.3
                  }
                ]
              }} 
            />
          ) : <>Empty...</>
        }
      </div>
    </div>
  )
}

export default SalesChart