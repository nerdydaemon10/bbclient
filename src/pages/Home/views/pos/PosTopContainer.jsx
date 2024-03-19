import { useSelector } from "react-redux"

function PosTopContainer() {
  const { user } = useSelector(state => state.auth)
  
  return (
    <div className="pos-top-container">
      <h3 className="mb-0">POS System</h3>
      <p className="mb-0">Hello {user.user.username}, Welcome Back!</p>
    </div>
  )
}

export default PosTopContainer