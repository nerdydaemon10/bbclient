import { Fragment } from "react"
import HomeStyle from "./HomeStyle.jsx"
import TrendsContainer from "./TrendsContainer.jsx"
import ChartsContainer from "./ChartsContainer.jsx"
import secureLocalStorage from "react-secure-storage"
import { checkUser } from "../../../util/helper.js"

function HomeView() {
  return (
    <Fragment>
      <HomeStyle />
      <TitleContainer />
      <TrendsContainer />
      <ChartsContainer />
    </Fragment>
  )
}

function TitleContainer() {
  const user = checkUser(secureLocalStorage.getItem("user"))
  
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Home Dashboard</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default HomeView