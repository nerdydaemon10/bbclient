/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { TextFieldInput, PasswordFieldInput, Button } from "../common"
import { login } from "../redux/authSlice.js"
import { findErrorByMessage, findErrorByName } from "../../util/helper.jsx"
import { Role } from "../../util/classes"
import { local } from "../../util"
import { isEmpty } from "lodash"

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const { loginResponse } = useSelector((state) => state.auth)
  const { isLoading, isSuccess, error } = loginResponse
  const usernameRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  // run only once.
  useEffect(() => {
    usernameRef.current.focus()
  }, [])
  
  useEffect(() => {
    if (!isSuccess) return
    const user = local.get("user")
    const roleId = user ? user.role_id : 0
    const role = Role.toEnum(roleId)
    
    navigate(`/${role}`)
  }, [isSuccess])

  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}> 
        <div>
          <h1 className="text-body-primary fs-2 fw-semibold mb-1">Login</h1>
          <p className="text-body-secondary fs-7 mb-2">BARISTA BRO - The Coffee People</p>
          <ErrorAlert error={error} />
        </div>
        <div className="d-flex flex-column gap-3">
          <TextFieldInput
            label="Username"
            name="username" 
            placeholder="Username"
            value={credentials.username}
            feedback={findErrorByName(error, "username")}
            onChange={handleChange}
            ref={usernameRef}
          />
          <PasswordFieldInput
            label="Password"
            name="password" 
            placeholder="Password"
            value={credentials.password}
            feedback={findErrorByName(error, "password")}
            onChange={handleChange}
          />
          <Button
            isLoading={isLoading}
            isFullWidth={true}
            isSubmit={true}
          >
            Login
          </Button>
        </div>
        <div className="text-center">
          <p className="text-muted fs-6">&copy; Diamond Tech I.T. Solutions</p>
        </div>
      </form>
    </div>
  )
}

function ErrorAlert({error}) {
  return (
    !isEmpty(findErrorByMessage(error)) && (
      <div className="alert alert-danger mb-1">
        <small>{findErrorByMessage(error)}</small>
      </div>
    )
  )
}

export default LoginPage