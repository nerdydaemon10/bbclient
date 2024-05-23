import { BiBarChart, BiBox, BiCheckCircle, BiGroup, BiHourglass, BiLineChart } from "react-icons/bi"
import { TrendCard } from "../../common/index.jsx"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { checkSummaries, toPeso } from "../../../util/helper.js"

function CardsSection() {
  const { data  } = useFetchSummariesQuery()

  const summaries = checkSummaries(data)
  const cards = [
    {
      title: "Today Sales",
      count: toPeso(summaries.sales.today),
      description: "Your sales for today",
      icon: <BiLineChart />
    },
    {
      title:"Pending Orders",
      count: summaries.counts.orders.pending,
      description: "Pending orders that you assisted",
      icon: <BiHourglass />
    },
    {
      title: "Customers",
      count: summaries.counts.customers,
      description: "Total of our customers",
      icon: <BiGroup />
    },
    {
      title: "Overall Sales",
      count: toPeso(summaries.sales.overall),
      description: "Your sales overall",
      icon: <BiBarChart />
    },
    {
      title: "Approved Orders",
      count: summaries.counts.orders.approved,
      description: "Approved orders that you assisted",
      icon: <BiCheckCircle />
    },
    {
      title: "Products",
      count: summaries.counts.products,
      description: "Total of registered products",
      icon: <BiBox />
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