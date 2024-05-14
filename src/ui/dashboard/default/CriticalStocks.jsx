import { isNil } from "lodash"
import { useFetchCriticalProductsQuery } from "../../../data/services/products.js"
import { Table } from "../../common/Table.jsx"
import { Button } from "../../common/index.jsx"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { toStocks } from "../../../util/helper.js"

function CriticalStocks() {
  const { isLoading, isFetching, data, error } = useFetchCriticalProductsQuery()
  const columns = [
    {
      name: "Stocks",
      accessor: "quantity",
      type: "number",
      sortable: true,
      render: (item) => <span>{toStocks(item.quantity)}</span>
    },
    {
      name: "Code",
      accessor: "product_code",
      type: "number",
      sortable: true
    },
    {
      name: "Name",
      accessor: "name",
      type: "string",
      sortable: true
    },
    {
      name: "Description",
      accessor: "description",
      type: "string",
      sortable: true
    },
    {
      name: "Category",
      accessor: "category_id",
      type: "string",
      render: (item) => (
        <span className="badge text-bg-light">
          {ProductCategory.toCategory(item.category_id)}
        </span>
      )
    }
  ]
  
  return (
    <div className="card border-danger">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="card-title text-danger fs-7 mb-0">
          Critical Stocks
        </h6>
        <button className="btn btn-sm opacity-0">Hidden</button>
      </div>
      <div className="card-body p-0">
        <div className="table-wrapper border-0">
          <Table
            name="critical stocks"
            columns={columns}
            data={isNil(data) ? [] : data}
            error={error}
            isFetching={isLoading || isFetching}
          />
        </div>
      </div>
    </div>
  )
}

export default CriticalStocks