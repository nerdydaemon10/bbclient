import { BiBarChart, BiBox, BiCheckCircle, BiGroup, BiHourglass, BiLineChart, BiShieldQuarter, BiUserCircle } from "react-icons/bi"
import { TrendCard } from "../../common/index.jsx"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries, toPeso } from "../../../util/helper.js"

function CardsSection() {
  const { data } = useFetchSummariesQuery()

  const summaries = checkSummaries(data)
  const cards = [
    {
      title: "Today Sales",
      count: toPeso(summaries.sales.today),
      description: "Our sales for today",
      icon: <BiLineChart />
    },
    {
      title:"Pending Orders",
      count: summaries.counts.orders.pending,
      description: "Total of pending orders",
      icon: <BiHourglass />
    },
    {
      title: "Customers",
      count: summaries.counts.customers,
      description: "Total of our customers",
      icon: <BiGroup />
    },
    {
      title: "Administrators",
      count: summaries.counts.employees.admin,
      description: "Total of admins",
      icon: <BiShieldQuarter />
    },
    {
      title: "Overall Sales",
      count: toPeso(summaries.sales.overall),
      description: "Our overall sales overtime",
      icon: <BiBarChart />
    },
    {
      title: "Approved Orders",
      count: summaries.counts.orders.approved,
      description: "Total of approved orders",
      icon: <BiCheckCircle />
    },
    {
      title: "Products",
      count: summaries.counts.products,
      description: "Total products in inventory",
      icon: <BiBox />
    },
    {
      title: "Employees",
      count: summaries.counts.employees.employee,
      description: "Total of employees",
      icon: <BiUserCircle />
    }
  ]
  
  return (
    <div className="cards-section d-grid gap-2">
      {cards.map((card, index) => (
        <TrendCard
          key={index}
          title={card.title}
          count={card.count}
          description={card.description}
          icon={card.icon}
        />
      ))}
    </div>
  )
}

export default CardsSection