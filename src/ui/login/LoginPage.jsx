import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import { TextFieldInput, PasswordFieldInput, Button } from "../common"
import { useLoginMutation } from "../../data/services/auth.js"
import { checkUser, getError, getErrorByName } from "../../util/helper.js"

function LoginPage() {
  const [login, { isLoading, isSuccess, data, error }] = useLoginMutation()

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const usernameRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(credentials)
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${data.user.role}`)
    }
  }, [isSuccess, navigate, data])
  
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
            feedback={getErrorByName(error, "username")}
            ref={usernameRef}
          />
          <PasswordFieldInput
            label="Password"
            name="password" 
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            feedback={getErrorByName(error, "password")}
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
  const message = getError(error)

  return (
    !isEmpty(message) && (
      <div className="alert alert-danger mb-1">
        <small>{message}</small>
      </div>
    )
  )
}

export default LoginPage