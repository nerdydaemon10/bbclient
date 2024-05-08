/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isEmpty, isNil, size } from "lodash"

import { GenericMessage, ModalType, ProductCategory } from "../../util/classes"
import { StringHelper, DateHelper } from "../../util/helpers"
import { productCategories } from "../../util/Config.jsx"
import { BiPlusCircle } from "react-icons/bi"
import { noSearchResults } from "../../util/helper.jsx"
import { Button, SearchFieldInput, SelectInput } from "../common"
import { Fragment, useCallback, useEffect, useState } from "react"
import { TableHeaders, TablePagination, TableStatus } from "../common/Table.jsx"
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
      <TableFiltering
        search={sq.search}
        category={sq.category}
        onChange={handleChange}
      />
      <TableContent
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
function TableFiltering({ search, category, onChange }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="search"
            placeholder="Search by Product..."
            value={search}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <SelectInput
            name="category_id"
            options={productCategories}
            isOptional
            value={category}
            onChange={onChange}
            onRender={(option) => ProductCategory.toCategory(option)}
          />
        </div>
      </div>
      <div>
        <Button variant="light" onClick={handleClick}>
          <BiPlusCircle className="me-1" />
          Create Product
        </Button>
      </div>
    </div>
  )
}
function TableContent({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const handleUpdate = (product) => {
    dispatch(setProduct(product))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }

  const handleRemove = (product) => {
    dispatch(setProduct(product))
    delay(() => dispatch(openModal(ModalType.REMOVE)), DELAY_MILLIS)
  }

  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <TableHeaders columns={columns} />
        <tbody>
          {
            isFetching ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.PRODUCTS_FETCHING} 
              />
            ) : error ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.PRODUCTS_ERROR} 
              />
            ) : noSearchResults(sq, data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.PRODUCTS_NO_MATCH} 
              />
            ) : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.PRODUCTS_EMPTY} 
              />
            ) : data.map((item, index) => (
              <TableItem 
                key={index} 
                item={item}
                onUpdate={() => handleUpdate(item)}
                onRemove={() => handleRemove(item)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function TableItem({item, onUpdate, onRemove}) {
  const productCode = StringHelper.truncate(item.product_code)
  const name = StringHelper.truncate(item.name)
  const description = StringHelper.truncate(item.description)
  const category = ProductCategory.toCategory(item.category_id)
  const stocks = StringHelper.toStocks(item.quantity)
  const srp = StringHelper.toPesoCurrency(item.srp)
  const memberPrice = StringHelper.toPesoCurrency(item.member_price)
  const createdBy = StringHelper.truncate(item.created_by)
  const dateCreated = DateHelper.toIsoStandard(item.created_at)
  const dateModified = DateHelper.toIsoStandard(item.updated_at)

  return (
    <tr>
      <td>{productCode}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <span className="badge text-bg-light">{category}</span>
      </td>
      <td>{stocks}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>{createdBy}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
      <td className="hstack gap-1">
        <Button size="sm" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="light" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </td>
    </tr>
  )
}

export default ProductsTable
