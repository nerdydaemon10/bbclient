import { BiCartAlt, BiCreditCard, BiGroup, BiLineChart } from "react-icons/bi";
import StringHelper from "../../../util/helpers/StringHelper.js";
import { TrendCard } from "../../common/index.jsx";

function TrendsContainer() {
  return (
    <>
      <TrendCard
        className="trend-1"
        title="Total Revenue"
        count={StringHelper.toPesoCurrency(50)}
        description="+20.1% from last month"
        icon={<BiLineChart />}
      />
      <TrendCard
        className="trend-2"
        title="Customers"
        count="+200"
        description="+20.1% from last month"
        icon={<BiGroup />}
      />
      <TrendCard
        className="trend-3"
        title="Sales"
        count="+12,658"
        description="+20.1% from last month"
        icon={<BiCreditCard />}
      />
      <TrendCard
        className="trend-4"
        title="Orders"
        count="+12,658"
        description="+20.1% from last month"
        icon={<BiCartAlt />}
      />
    </>
  )
}

export default TrendsContainer