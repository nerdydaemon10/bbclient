import { isNil } from "lodash"
import React from "react"

import { createGlobalStyle } from "styled-components"
import { Button } from "../../common/index.jsx"

const Style = createGlobalStyle`
  .card {
    grid-template-rows: max-content 1fr;
  }
  .card-body {
    overflow: auto;
  }
`

function HomeCard({
  isFetching,
  isError,
  isEmpty,
  title, 
  description, 
  actions,
  children  
}) {
  const Loading = () => {
    return (
      <div className="hstack gap-2 fs-8">
        <span className="spinner-border spinner-border-sm"></span>
        <span>Fetching Data, Please Wait...</span>
      </div>
    )
  }

  const Error = () => {
    return (
      <span className="fs-8">Something went wrong, please try again.</span>
    )
  }

  const Empty = () => {
    return (
      <span className="fs-8">No data yet.</span>
    )
  }

  return (
    <React.Fragment>
      <Style />
      <div className="card">
        {/*Header*/}
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-body-primary mb-0">{title}</h6>
            {!isNil(description) && <p className="text-body-secondary fs-8 mb-0">{description}</p>}
          </div>
          {isNil(actions) ? <Button className="visually-hidden">Hidden</Button> : actions}
        </div>
        {/*Body*/}
        <div className={`card-body ${isFetching || isError ? "d-flex justify-content-center align-items-center": ""}`}>
          {
            isFetching ? 
            <Loading /> 
            : isError ?
            <Error /> 
            : isEmpty ?
            <Empty /> 
            : <>{children}</>
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeCard