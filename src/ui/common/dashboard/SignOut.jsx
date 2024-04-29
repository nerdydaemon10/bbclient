import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import local from "../../../util/local.js"
import { logout } from "../../redux/authSlice.js"

function SignOut() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    local.clear()
    
    dispatch(logout())
    navigate("/")
  }, [dispatch, navigate])
}

export default SignOut