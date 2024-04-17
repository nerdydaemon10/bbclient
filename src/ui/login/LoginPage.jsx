/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { findErrorByName } from "../../utils/helpers/FormHelper.jsx"
import LoginStyle from "./LoginStyle.jsx"
import FormPasswordTextField from "../components/forms/FormPasswordField.jsx"
import { FormTextFieldInput, PrimaryButton } from "../common/index.jsx"
import { login } from "../redux/authSlice.jsx"
import { findErrorByMessage } from "../../utils/Helper.jsx"
import StringHelper from "../../utils/helpers/StringHelper.jsx"

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

  const { loginResponse } = useSelector((state) => state.auth)  
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const usernameRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  // run only once.
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    if (loginResponse.isSuccess) {
      navigate("/home")
    }
  }, [loginResponse.isSuccess])

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
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
          {
            StringHelper.notEmpty(findErrorByMessage(loginResponse.error)) ? (
              <div className="alert alert-dismissible alert-danger">
                <small>{findErrorByMessage(loginResponse.error)}</small>
              </div>
            ) : <></>
          }
        </div>
        <div className="app-sy-12">
          <FormTextFieldInput
            label="Username"
            name="username" 
            placeholder="Username"
            value={credentials.username}
            feedback={findErrorByName(loginResponse.error, "username")}
            onChange={handleChange}
            ref={usernameRef}
          />
          <FormPasswordTextField
            label="Password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            feedback={findErrorByName(loginResponse.error, "password")}
            onChange={handleChange}
          />
          <PrimaryButton
            isLoading={loginResponse.isLoading}
            isFullWidth={true}
            isSubmit={true}
          >
            Login
          </PrimaryButton>
        </div>
        <div className="text-center">
          <p className="app-text-footer">&copy; Diamond Tech I.T. Solutions</p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage