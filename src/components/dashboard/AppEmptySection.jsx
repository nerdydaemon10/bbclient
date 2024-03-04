import EmptyVector from "../../assets/svg/empty_vector.svg"

function AppEmptySection() {
    return (
      <>
        <div className="app-empty-section text-center app-sy-8">
          <img className="app-empty-section-vector" src={EmptyVector} />
          <h1 className="app-text-title">Empty Products</h1>
          <p className="app-text-title-caption">Please go to inventory side and add a products</p>
        </div>
      </>
    )
}

export default AppEmptySection