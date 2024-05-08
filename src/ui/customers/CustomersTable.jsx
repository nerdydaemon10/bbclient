/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isEmpty, isNil, size } from "lodash"
import { BiPlusCircle } from "react-icons/bi"
import { Fragment, useCallback, useEffect, useState } from "react"

import { Fallback, GenericMessage, ModalType } from "../../util/classes"
import { DateHelper, StringHelper } from "../../util/helpers"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { noSearchResults } from "../../util/helper.jsx"
import { Button, SearchFieldInput, TablePagination, TableStatus, TableHeaders } from "../common"
import { openModal, setCustomer, setSq } from "../redux/customersSlice.js"
import { useFetchCustomersQuery } from "../../data/services/customers.js"
import { nextPage, previousPage } from "../redux/customersSlice.js"

const columns = ["Full Name", "Address", "Phone Number", "Email Address", "Created By", "Date Created", "Date Modified", "Action"]
const colSpan = size(columns)

function CustomersTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.customers)
  const [sqtemp, setSqtemp] = useState(sq)

  const { data, error, isLoading, isFetching } = useFetchCustomersQuery(sqtemp)
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
      <TableFiltering 
        search={sq.search}
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
function TableFiltering({search, onChange}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="table-filtering">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            placeholder="Search by Customer..."
            name="search"
            value={search}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <Button variant="light" onClick={handleClick}>
            <BiPlusCircle className="me-1" />
            Create Customer
          </Button>
        </div>
      </div>
    </div>
  )
}
function TableContent({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const handleUpdate = (customer) => {
    dispatch(setCustomer(customer))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }

  const handleRemove = (customer) => {
    dispatch(setCustomer(customer))
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
                message={GenericMessage.CUSTOMERS_FETCHING} 
              />
            ) : error ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.CUSTOMERS_ERROR} 
              />
            ) : noSearchResults(sq, data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.CUSTOMERS_NO_MATCH} 
              />
            ) : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.CUSTOMERS_EMPTY} 
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
  const fullName = StringHelper.truncate(item.full_name)
  const address = StringHelper.truncate(item.address)
  const phoneNumber = StringHelper.truncate(item.phone_number)
  const emailAddress = StringHelper.truncate(item.email_address)
  const createdBy = StringHelper.truncate(item.created_by)
  const dateCreated = DateHelper.toIsoStandard(item.created_at)
  const dateModified = DateHelper.toIsoStandard(item.updated_at)

  return (
    <tr>
      <td>{fullName}</td>
      <td>{address}</td>
      <td>{phoneNumber}</td>
      <td>{emailAddress}</td>
      <td>{createdBy}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
      <td className="hstack gap-1">
        <Button variant="dark" size="sm" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="light" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </td>
    </tr>
  )
}

export default CustomersTable