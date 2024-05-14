import { Fragment } from "react"
import local from "../../../util/local.js"
import HomeStyle from "./HomeStyle.jsx"
import TrendsContainer from "./TrendsContainer.jsx"
import ChartsContainer from "./ChartsContainer.jsx"
import Fallback from "../../../util/classes/Fallback.js"

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
  const user = Fallback.checkUser(local.get("user"))
  
  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Home Dashboard</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default HomeView