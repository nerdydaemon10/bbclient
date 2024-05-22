import React from "react"
import secureLocalStorage from "react-secure-storage"

import HomeStyle from "./HomeStyle.jsx"
import CardsSection from "./CardsSection.jsx"
import ChartsSection from "./ChartsSection.jsx"
import { checkUser } from "../../../util/helper.js"

function HomeView() {
  return (
    <React.Fragment>
      <HomeStyle />
      <TitleSection />
      <CardsSection />
      <ChartsSection />  
    </React.Fragment>
  )
}

function TitleSection() {
  const user = checkUser(secureLocalStorage.getItem("user"))
  
  return (
    <div className="title-section">
      <h3 className="text-body-primary fw-bold mb-0">Home Dashboard</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default HomeView