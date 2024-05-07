import { Fragment } from "react"
import local from "../../../util/local.js"
import HomeStyle from "./HomeStyle.jsx"
import TrendsContainer from "./TrendsContainer.jsx"
import { faker } from "@faker-js/faker"
import ChartsContainer from "./ChartsContainer.jsx"

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

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(50, 50, 50)',
      backgroundColor: 'rgba(40, 44, 52, 0.5)',
    },
  ],
};

function TitleContainer() {
  const user = local.get("user")

  return (
    <div className="title-container">
      <h3 className="text-body-primary fw-bold mb-0">Home Dashboard</h3>
      <p className="text-body-secondary fw-normal mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default HomeView