import { BiBox, BiCalendar, BiCartAlt, BiCreditCardAlt, BiDollar, BiGroup, BiLineChart, BiUserCircle } from "react-icons/bi"
import { TrendCard } from "../../common/index.jsx"
import { Fragment } from "react"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import StringHelper from "../../../util/helpers/StringHelper.js"

function TrendsContainer() {
  const { data, error, isLoading, isFetching } = useFetchSummariesQuery()

  const totalSales = StringHelper.toPesoCurrency(data?.transactions_total.total_sales ?? 0.00)
  const todaySales = StringHelper.toPesoCurrency(data?.transactions_total.today_sales ?? 0.00)
  const totalPending = StringHelper.toPesoCurrency(data?.transactions_total.total_pending ?? 0.00)
  const totalRejected = StringHelper.toPesoCurrency(data?.transactions_total.total_rejected ?? 0.00)
  const totalCommission = StringHelper.toPesoCurrency(data?.transactions_total.total_commission ?? 0.00)

  const orders = data?.orders ?? 0
  const inventory = data?.inventory ?? 0
  const customers = data?.customers ?? 0
  const employees = data?.employees ?? 0

  return (
    <Fragment>
      <div className="trends-container gap-2">
        <TrendCard
          title="Today Sales"
          count={todaySales}
          description="Total sales today"
          icon={<BiDollar />}
        />
        <TrendCard
          title="Total Sales"
          count={totalSales}
          description="Total sales overtime"
          icon={<BiLineChart />}
        />
        <TrendCard
          title="Orders"
          count={orders}
          description="Number of orders"
          icon={<BiCartAlt />}
        />
        <TrendCard
          title="Bookings"
          count={0}
          description="Number of booked trainings"
          icon={<BiCalendar />}
        />
        <TrendCard
          title="Commission"
          count={totalCommission}
          description="Your commission from sales"
          icon={<BiCreditCardAlt />}
        />
        <TrendCard
          title="Inventory"
          description="Number of products"
          count={inventory}
          icon={<BiBox />}
        />
        <TrendCard
          title="Customers"
          count={customers}
          description="Number of customers"
          icon={<BiGroup />}
        />
        <TrendCard
          title="Employees"
          count={employees}
          description="Number of employees"
          icon={<BiUserCircle />}
        />
      </div>
    </Fragment>
  )
}

export default TrendsContainer