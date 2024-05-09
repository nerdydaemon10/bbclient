import { isNil } from "lodash"
import { useFetchCriticalProductsQuery } from "../../../data/services/products.js"
import { Table } from "../../common/Table.jsx"
import { Button } from "../../common/index.jsx"
import StringHelper from "../../../util/helpers/StringHelper.js"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { BiBlock, BiMessageAltError, BiSolidMessageAltError } from "react-icons/bi"

function CriticalStocks() {
  const { isLoading, isFetching, data, error } = useFetchCriticalProductsQuery()
  const columns = [
    {
      name: "Stocks",
      accessor: "quantity",
      type: "integer",
      sortable: true,
      render: (item) => <span>{StringHelper.toStocks(item.quantity)}</span>
    },
    {
      name: "Code",
      accessor: "product_code",
      type: "integer",
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
    },
    {
      name: "Action",
      render: (item) => <Button className="btn btn-sm">Restock</Button>
    },
  ]

  return (
    <div className="card border-danger">
      <div className="card-header bg-danger-subtle border-danger d-flex justify-content-between align-items-center">
        <h6 className="card-title fs-7 mb-0">
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