import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import local from "../../../util/local.js"

function SignOut() {
  const navigate = useNavigate()
  
  useEffect(() => {
    local.clear()
    navigate("/")
  }, [navigate])
}

export default SignOut