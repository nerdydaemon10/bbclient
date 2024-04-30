import { useSelector } from "react-redux"
import { BiAt, BiBriefcase, BiCalendar, BiCategory, BiCreditCard, BiHome, BiHourglass, BiPhone, BiReceipt, BiUser } from "react-icons/bi"

function CheckoutDetails() {
  const { order } = useSelector((state) => state.checkouts)

  return (
    <div className="checkout-details-container gap-2">
      <div className="order-details-container card">
        <div className="card-header">
          <div className="card-header-title">
            Order Details
          </div>
        </div>
        <div className="card-body">
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiReceipt className="me-1" />
              Reference Number
            </p>
            <p>B432842389423890423890</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiHourglass className="me-1" />
              Status
            </p>
            <p>Approved</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiCreditCard className="me-1" />
              Payment Method
            </p>
            <p>Cash-On-Delivery</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiBriefcase className="me-1" />
              Salesperson
            </p>
            <p>Keanno Manuel R. Regino</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiCalendar className="me-1" />
              Date Ordered
            </p>
            <p>2024-04-29</p>
          </div>
        </div>
      </div>
      <div className="customer-details-container card">
        <div className="card-header">
          <div className="card-header-title">
            Customer Details
          </div>
        </div>
        <div className="card-body">
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiUser className="me-1" />
              Full Name
            </p>
            <p>Jim Cordero</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiHome className="me-1" />
              Home Address
            </p>
            <p>Malabon City</p>
          </div>
          <div>
            <p className="text-body-secondary fs-7 mb-0">
              <BiPhone className="me-1" />
              Phone Number
            </p>
            <p>09325477557</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutDetails