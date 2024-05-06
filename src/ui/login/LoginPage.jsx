/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { TextFieldInput, PasswordFieldInput, Button } from "../common"
import { getErrorMessage } from "../../util/helper.jsx"
import { Role } from "../../util/classes"
import { local } from "../../util"
import { isEmpty } from "lodash"
import InputHelper from "../../util/helpers/InputHelper.js"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/authSlice.js"

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const { loginResponse } = useSelector((state) => state.auth)
  const { isLoading, isSuccess, data, error } = loginResponse
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
    const { token, user } = data
    const role = Role.toEnum(user.role_id)

    local.set("token", token)
    local.set("user", user)

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
            onChange={handleChange}
            feedback={InputHelper.getErrorByName(error, "username")}
            ref={usernameRef}
          />
          <PasswordFieldInput
            label="Password"
            name="password" 
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            feedback={InputHelper.getErrorByName(error, "password")}
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
  const message = getErrorMessage(error)

  return (
    !isEmpty(message) && (
      <div className="alert alert-danger mb-1">
        <small>{message}</small>
      </div>
    )
  )
}

export default LoginPage