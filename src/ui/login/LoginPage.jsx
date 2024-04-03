import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/auth/authSlice.jsx"
import AppPrimaryButton from "../components/buttons/AppPrimaryButton.jsx"
import { findErrorByName } from "../../utils/helpers/FormHelper.jsx"
import FormTextField from "../components/forms/FormTextField.jsx"
import LoginStyle from "./LoginStyle.jsx"
import FormPasswordTextField from "../components/forms/FormPasswordField.jsx"

function LoginPage() {
  return (
    <>
      <LoginStyle />
      <LoginView />
    </>
  )
}

function LoginView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, error, accessToken } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const usernameRef = useRef(null)

  // focus username once.
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    if(accessToken != null) {
      navigate("/home")
    }
  }, [navigate, accessToken])

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  return (
    <div className="login-wrapper">
      <form 
        className="login-form app-sy-16" 
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="app-text-title">Login</h1>
          <p className="app-text-title-caption">BARISTA BRO - The Coffee People</p>
        </div>
        <div className="app-sy-12">
          <FormTextField
            name="username" 
            label="Username"
            placeholder="Username..."
            value={credentials.username}
            feedback={findErrorByName(error, "username")}
            onChange={handleChange}
            ref={usernameRef}
          />
          <FormPasswordTextField
            name="password"
            label="Password"
            placeholder="Password..."
            value={credentials.password}
            feedback={findErrorByName(error, "password")}
            onChange={handleChange}
          />
          <AppPrimaryButton
            text="Login"
            status={status}
            fullWidth
            submit
          />
        </div>
        <div className="text-center">
          <p className="app-text-footer">&copy; Diamond Tech I.T. Solutions</p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage