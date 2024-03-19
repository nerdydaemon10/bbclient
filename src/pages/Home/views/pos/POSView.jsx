import { debounce } from "lodash"
import { createContext, useEffect, useState } from "react"
import { BiFile, BiPackage } from "react-icons/bi"

import PosTopContainer from "./PosTopContainer.jsx"
import PosFilteringContainer from "./PosFilteringContainer.jsx"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../utils/classes/AppConfig.jsx"
import PosTableContainer from "./PosTableContainer.jsx"
import PosPaginationContainer from "./PosPaginationContainer.jsx"
import PosTabsContainer from "./PosTabsContainer.jsx"
import PosTabContainer from "./PosTabContainer.jsx"
import PosCheckoutBtn from "./PosCheckoutBtn.jsx"
import "./PosView.css"

const tabs = [
  {
    id: 1,
    name: "Check List",
    icon: <BiPackage className="me-1" size={18} />,
    value: "is-checkout-list"
  },
  {
    id: 2,
    name: "Order Info",
    icon: <BiFile className="me-1" size={18} />,
    value: "is-order-info"
  }
]

const PosProvider = createContext([])

function PosView() {
  const dispatch = useDispatch()

  const { checkouts } = useSelector((state) => state.pos)

  return (
    <PosProvider>
      <PosTopContainer />
      <PosStartContainer />
      <PosEndContainer />
    </>
  )
}

function PosStartContainer() {
  const dispatch = useDispatch()

  const { productsApi } = useSelector((state) => state.pos)
  const { status, data, meta, error } = productsApi

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerPages[0].id)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchProducts = debounce(() => {
    dispatch(fetchProductsAsync({
      name: name,
      category_id: category,
      per_page: rowsPerPage,
      page: currentPage
    }))
  }, AppConfig.DEBOUNCE_DELAY)

  const handleNameChange = (e) => {
    setName(e.target.value)
    handleSearchProducts.cancel()
  }

  const handleCategoryChange = (e) => {
    setCurrentPage(1)
    setCategory(e.target.value)
    handleSearchProducts.cancel()
  }

  const handleRowsPerPageChange = (e) => {
    setCurrentPage(1)
    setRowsPerPage(e.target.value)
    handleSearchProducts.cancel()
  }

  const handlePreviousClick = () => {
    setCurrentPage(prev => (prev > 1) ? prev - 1 : 1)
    handleSearchProducts.cancel()
  }

  const handleNextClick = () => {
    setCurrentPage(prev => (prev < meta.last_page) ? prev + 1 : meta.last_page)
    handleSearchProducts.cancel()
  }

  useEffect(() => {
    handleSearchProducts()
    return () => { handleSearchProducts.cancel() }
  }, [name, category, rowsPerPage, currentPage]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PosFilteringContainer 
        name={name} 
        category={category} 
        onNameChange={handleNameChange} 
        onCategoryChange={handleCategoryChange} 
      />
      <PosTableContainer 
        status={status} 
        data={data} 
        error={error} 
      />
      <PosPaginationContainer 
        meta={meta}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onChange={handleRowsPerPageChange}
        onPrevious={handlePreviousClick}
        onNext={handleNextClick}
      />
    </>
  )
}

function PosEndContainer({checkouts}) {
  const [tab, setTab] = useState(tabs[0].value)

  const [customer, setCustomer] = useState({
    name: "",
    contactNumber: "",
    deliveryAddress: ""
  })
  const [paymentMethod, setPaymentMethod] = useState(1)

  const handleChange = (id) => {
    setTab(id)
  }

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  return (
    <>
      <PosTabsContainer
        tabs={tabs}
        tab={tab}
        onChange={handleChange}
      />
      <PosTabContainer 
        tab={tab}
        customer={customer}
        paymentMethod={paymentMethod}
        onCustomerChange={handleCustomerChange}
        onPaymentMethodChange={handlePaymentMethodChange}
      />
      <PosCheckoutBtn checkouts={checkouts} customer={customer} />
    </>
  )
}

export default PosView