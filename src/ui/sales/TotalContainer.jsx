import StringHelper from "../../util/helpers/StringHelper.js"

function TotalContainer() {
  const commission = StringHelper.toPesoCurrency(0)
  const sales = StringHelper.toPesoCurrency(0)

  return (
    <div className="total-container d-flex flex-column">
      <div className="total-item d-flex flex-row justify-content-between p-1">
        <span className="total-item-name">Commission</span>
        <span className="total-item-value">{commission}</span>
      </div>
      <div className="total-item d-flex flex-row justify-content-between p-1">
        <span className="total-item-name">Sales</span>
        <span className="total-item-value">{sales}</span>
      </div>
    </div>
  )
}

export default TotalContainer