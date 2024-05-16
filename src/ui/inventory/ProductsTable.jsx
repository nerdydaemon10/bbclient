/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isNil, size } from "lodash"

import { ModalType, ProductCategory } from "../../util/classes"
import { productCategories } from "../../util/Config.jsx"
import { BiPlusCircle } from "react-icons/bi"
import { toDateTime, toPeso, toStocks, truncate } from "../../util/helper.js"
import { Button, SearchFieldInput, SelectInput } from "../common"
import { Fragment, useCallback, useEffect, useState } from "react"
import { Table, TablePagination } from "../common/Table.jsx"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { useFetchProductsQuery } from "../../data/services/products.js"
import Fallback from "../../util/classes/Fallback.js"
import { nextPage, openModal, previousPage, setProduct, setSq } from "../redux/inventorySlice.js"

const columns = ["Code", "Name", "Description", "Category", "Stocks", "Price/SRP", "Price/Member", "Created By", "Date Created", "Date Modified", "Action"]
const colSpan = size(columns)

function ProductsTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.inventory)
  const [sqtemp, setSqtemp] = useState(sq)

  const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])

  const { isLoading, isFetching, data, error } = useFetchProductsQuery(sqtemp)
  const meta = Fallback.checkMeta(data)

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
        category={sq.category}
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
function TableFilter({ search, category, onChange }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="table-filter d-flex justify-content-between">
      <div className="d-flex flex-row gap-2">
        <SearchFieldInput
          name="search"
          placeholder="Search by Product..."
          value={search}
          onChange={onChange}
        />
        <SelectInput
          name="category_id"
          options={productCategories}
          isOptional
          value={category}
          onChange={onChange}
          onRender={(option) => ProductCategory.toCategory(option)}
        />
      </div>
      <Button variant="light" onClick={handleClick}>
        <BiPlusCircle className="me-1" />
        Create Product
      </Button>
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const handleUpdate = (product) => {
    dispatch(setProduct(product))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }

  const handleRemove = (product) => {
    dispatch(setProduct(product))
    delay(() => dispatch(openModal(ModalType.REMOVE)), DELAY_MILLIS)
  }

  const columns = [
    {
      name: "Code",
      accessor: "product_code",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Name",
      accessor: "name",
      type: "string",
      format: "string",
      sortable: true,
      render: (item) => <NameRenderer item={item} />
    },
    {
      name: "Category",
      accessor: "category_id",
      type: "number",
      sortable: true,
      render: (item) => <StatusRenderer item={item} />
    },
    {
      name: "Stocks",
      accessor: "quantity",
      type: "number",
      format: "stocks",
      sortable: true
    },
    {
      name: "Price/SRP",
      accessor: "srp",
      type: "number",
      format: "currency",
      sortable: true
    },
    {
      name: "Price/MP",
      accessor: "member_price",
      type: "number",
      format: "currency",
      sortable: true
    },
    {
      name: "Created By",
      accessor: "created_by",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Date/Created",
      accessor: "created_at",
      type: "datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Date/Modified",
      accessor: "updated_at",
      type: "datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Actions",
      render: (item) => (
        <ActionRenderer 
          onUpdate={() => handleUpdate(item)} 
          onRemove={() => handleRemove(item)} 
        />
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

function NameRenderer({item}) {
  const name = truncate(item.name)
  const description = truncate(item.description)

  return (
    <div className="vstack">
      <span className="text-body-primary">{name}</span>
      <span className="text-body-secondary">{description}</span>
    </div>
  )
}
function StatusRenderer({item}) {
  const category = ProductCategory.toCategory(item.category_id)

  return (
    <span className="badge text-bg-light">{category}</span>
  )
}
function ActionRenderer({onUpdate, onRemove}) {
  return (
    <div className="hstack gap-1">
      <Button size="sm" onClick={onUpdate}>
        Update
      </Button>
      <Button variant="light" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  )
}

export default ProductsTable