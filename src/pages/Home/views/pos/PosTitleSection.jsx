import { useSelector } from "react-redux"


function PosTitleSection() {
  const { user } = useSelector(state => state.auth)
  return (
    <div className="pos-title-section">
      <h3 className="mb-0">POS System</h3>
      <p className="mb-0">Hello {user.user.username}, Welcome Back!</p>
    </div>
  )
}

export default PosTitleSection