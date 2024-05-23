import { BiSolidCoffeeBean } from "react-icons/bi"
import { useFetchSummariesProductsQuery } from "../../../data/services/summaries.js"
import { isEmpty } from "lodash"
import { toPeso, toStocks, truncate } from "../../../util/helper.js"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { HomeCard } from "../../common/index.jsx"

function CriticalStocks() {
  const { isLoading, isFetching, isError, data } = useFetchSummariesProductsQuery()

  return (
    <HomeCard
      isFetching={isLoading || isFetching}
      isError={isError}
      isEmpty={isEmpty(data)}
      name="Critical Stocks"
      title="Critical Stocks"
      description="List of critical stocks inside inventory"
    >
      <ul className="list-unstyled d-flex flex-column gap-2">
        {
          isEmpty(data) ? (
            <li>No critical stocks yet.</li>
          ) : data.map((item, index) => {
            const name = truncate(item.name, 24)
            const category = ProductCategory.toCategory(item.category_id)
            const code = truncate(item.product_code, 14)
            const price = toPeso(item.srp)
            const stocks = toStocks(item.quantity)

            return (
              <li key={index} className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row align-items-center gap-3">
                  <div className="avatar">
                    <BiSolidCoffeeBean />
                  </div>
                  <div>
                    <h6 className="text-body-primary mb-0">
                      {name}
                    </h6>
                    <span className="text-body-secondary fs-8">{code}, {category}, {price}</span>
                  </div>
                </div>
                <div className="text-end">
                  <h6 className="text-body-primary mb-0">{`${stocks} left!`}</h6>
                  <span className="text-body-secondary fs-8">
                    *Please restock before nothing left.
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </HomeCard>
  )
}


export default CriticalStocks