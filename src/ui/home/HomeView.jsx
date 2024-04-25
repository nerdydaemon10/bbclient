import local from "../../util/local.js"

function HomeView() {
  return (
    <>
      <HomeStyle />
      <TitleContainer />
    </>
  )
}

function TitleContainer() {
  const user = local.get("user")

  return (
    <div className="title-container">
      <h3 className="mb-0">Home Dashboard</h3>
      <p className="mb-0">Hello {user.full_name}, Welcome Back!</p>
    </div>
  )
}

export default HomeView