/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { isCheckedOut } from "./Util.jsx"
import { DELAY_MILLIS, productCategories } from "../../../util/Config.jsx"
import { Button, SearchFieldInput, SelectInput, TablePagination } from "../../common"
import { Fragment, useCallback, useEffect, useState } from "react"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import {checkout, nextPage, previousPage, selectSq, setSq } from "../../redux/posSlice.js"
import { debounce, isNil } from "lodash"
import { useFetchProductsQuery } from "../../../data/services/products.js"
import Fallback from "../../../util/classes/Fallback.js"
import { Table } from "../../common/Table.jsx"
import { toPeso, toStocks } from "../../../util/helper.js"

function ProductsTable() {
  const dispatch = useDispatch()

  const sq = useSelector((state) => selectSq(state.pos))
  const [sqtemp, setSqtemp] = useState(sq)
  
  const { data, error, isLoading, isFetching } = useFetchProductsQuery(sqtemp)
  const meta = Fallback.checkMeta(data)
  
  const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])
  
  const handleChange = (e) => {
    dispatch(setSq(e))
  }
  const handlePrevious = () => {
    dispatch(previousPage())
  }
  const handleNext = (meta) => {
    dispatch(nextPage(meta))
  }
  
  useEffect(() => {
    debouncer(sq)
  }, [sq])

  return (
    <Fragment>
      <TableFilter
        search={sq.search}
        category={sq.category_id}
        onChange={handleChange}
      />
      <TableData
        sq={sq}
        data={isNil(data) ? [] : data.data}
        error={error}
        isFetching={isLoading || isFetching}
      />
      <TablePagination
        meta={meta}
        rowsPerPage={sq.per_page}
        isFetching={isLoading || isFetching}
        onChange={handleChange}
        onPrevious={handlePrevious}
        onNext={() => handleNext(meta)}
      />
    </Fragment>
  )
}
function TableFilter({search, category, onChange}) {
  return (
    <div className="table-filter d-flex gap-2">
      <SearchFieldInput
        name="search"
        value={search}
        onChange={onChange}
        placeholder="Search by Product..."
      />
      <SelectInput
        name="category_id"
        options={productCategories}
        value={category}
        onChange={onChange}
        onRender={(option) => ProductCategory.toCategory(option)}
        isOptional
      />
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()
  const { checkouts } = useSelector(state => state.pos)

  const handleCheckout = (product) => {
    dispatch(checkout(product))
  }

  const columns = [
    {
      name: "Code",
      accessor: "product_code",
      type:"string",
      sortable: true
    },
    {
      name: "Name",
      accessor: "name",
      type:"string",
      sortable: true,
      render: (item) => (
        <div className="vstack">
          <span className="text-body-primary">{item.name}</span>
          <span className="text-body-secondary">{item.description}</span>   
        </div>
      )
    },
    {
      name: "Category",
      accessor: "category_id",
      type: "number",
      sortable: true,
      render: (item) => (
        <span className="badge text-bg-light">
          {ProductCategory.toCategory(item.category_id)}
        </span>
      )
    },
    { 
      name: "Stocks",
      accessor: "quantity",
      type: "number",
      sortable: true,
      render: (item) => toStocks(item.quantity)
    },
    {
      name: "Price/SRP",
      accessor: "srp",
      type:"integer",
      sortable: true,
      render: (item) => toPeso(item.srp)
    },
    {
      name: "Action",
      render: (item) => (
        <Button
          size="sm"
          isDisabled={isCheckedOut(checkouts, item)}
          onClick={() => handleCheckout(item)}
        >
          Checkout
        </Button>
      )
    },
  ]

  return (
    <div className="table-wrapper table-data">
      <Table
        name="products" 
        columns={columns}
        sq={sq}
        data={data}
        error={error}
        isFetching={isFetching}
      />
    </div>
  )
}

export default ProductsTable