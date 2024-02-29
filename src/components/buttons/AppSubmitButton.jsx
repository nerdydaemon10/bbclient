import "boxicons"
import UiStatus from "../../utils/classes/UiStatus.jsx"

function AppSubmitButton(props) {
  const isLoading = props.state == UiStatus.LOADING ? "is-loading" : ""
  
  return (
    <button className={`btn btn-dark btn-block app-button ${isLoading}`}>
      <span className="app-button-icon">
        <box-icon name="loader" animation="spin" color="#fff"></box-icon>
      </span>
      <span className="app-button-text">{props.text}</span>
    </button>
  )
}

export default AppSubmitButton