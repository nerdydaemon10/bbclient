import React from "react"
import LoginStyle from "./LoginStyle.jsx"
import { BiLogoFacebookCircle, BiLogoInstagramAlt, BiLogoTiktok, BiLogoYoutube, BiSolidCoffeeBean, BiSolidDiamond, BiSolidEnvelope, BiSolidStoreAlt } from "react-icons/bi"

import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import { TextFieldInput, PasswordFieldInput, Button } from "../common"
import { useLoginMutation } from "../../data/services/auth.js"
import { getError, getErrorByName } from "../../util/helper.js"
import moment from "moment"

function LoginPage() {
  return (
    <React.Fragment>
      <LoginStyle />
      <div className="login-grid d-grid vw-100 vh-100">
        <NavTop />
        <Navbar />
        <Main />
        <Footer />
      </div>
    </React.Fragment>
  )
}

function NavTop() {
  return (
    <nav className="nav-top bg-dark text-white py-1 px-2 d-flex justify-content-between">
      <ul className="list-unstyled p-0 m-0 d-flex flex-row gap-3">
        <li className="fs-8">
          <span className="me-1">
            <BiSolidStoreAlt />
          </span>
          Shaw, Mandaluyong City, Metro Manila - Philippines
        </li>
        <li className="fs-8">
          <span className="me-1">
            <BiSolidEnvelope />
          </span>
          baristabrosofficial@gmail.com
        </li>
      </ul>
      <ul className="list-unstyled p-0 m-0 d-flex flex-row gap-3">
        <li className="fs-8">
          <a 
            href="https://www.facebook.com/Baristabrothers.official/" 
            className="text-white"
          >
            <span className="me-1">
              <BiLogoFacebookCircle />
            </span>
            Barista Brothers
          </a>
        </li>
        <li className="fs-8">
          <a 
            href="https://www.instagram.com/baristabrothers.official/" 
            className="text-white"
          >
            <span className="me-1">
              <BiLogoInstagramAlt />
            </span>
            @baristabrothers.official
          </a>
        </li>
        <li className="fs-8">
          <a 
            href="https://www.youtube.com/channel/UCOrJ9iZf5cJyGnMKDkzcLRA" 
            className="text-white"
          >
            <span className="me-1">
              <BiLogoYoutube />
            </span>
            @barista.brothers
          </a>
        </li>
        <li className="fs-8">
          <a 
            href="https://www.tiktok.com/@barista.brothers?is_from_webapp=1&sender_device=pc" 
            className="text-white"
          >
            <span className="me-1">
              <BiLogoTiktok />
            </span>
            @barista.brothers
          </a>
        </li>
      </ul>
    </nav>
  )
}
function Navbar() {
  return (
    <nav className="navbar border-bottom py-3 px-2">
      <h3 className="fw-bolder mb-0">
        <span className="me-2">
          <BiSolidCoffeeBean />
        </span>
        BARISTA BROTHERS
      </h3>
    </nav>
  )
}
function Main() {
  const [login, { isLoading, isSuccess, data, error }] = useLoginMutation()

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const usernameRef = useRef(null)
  const navigate = useNavigate()
  const year = moment().format("YYYY")

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
    <main className="main d-flex justify-content-center align-items-center">
      <form 
        className="login-form d-flex flex-column gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="fw-semibold mb-0">Login</h2>
          <p className="fs-7 text-body-secondary">Login with your credentials</p>
          <ErrorAlert error={error} />
        </div>
        <div className="d-flex flex-column gap-3 mb-2">
          <TextFieldInput
            label="Username"
            name="username" 
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            feedback={getErrorByName(error, "username")}
            ref={usernameRef}
            maxLength={64}
          />
          <PasswordFieldInput
            label="Password"
            name="password" 
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            feedback={getErrorByName(error, "password")}
            maxLength={64}
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
          <p className="text-muted fs-7">
            Copyright &copy; {year} Barista Brothers.
          </p>
        </div>
      </form>
    </main>
  )
}
function Footer() {
  return (
    <footer className="footer text-white text-center py-3">
      <p className="mb-0 fs-7">
        <span className="me-1">
          <BiSolidDiamond />
        </span>
        Powered By Diamond Tech I.T Services
      </p>
    </footer>
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