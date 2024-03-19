import "boxicons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppCenteredLayout from "../../layouts/AppCenteredLayout.jsx"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/auth/authSlice.jsx"
import AppPrimaryButton from "../../components/buttons/AppPrimaryButton.jsx"
import AppFormTextField from "../../components/forms/AppFormTextField.jsx";
import AppFormPasswordTextField from "../../components/forms/AppFormPasswordTextField.jsx";
import { findErrorByName } from "../../utils/helpers/FormHelper.jsx";

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, error, accessToken } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

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
    <AppCenteredLayout>
      <form className="w-25 app-sy-16" onSubmit={handleSubmit}>
        <div>
          <h1 className="app-text-title">Login</h1>
          <p className="app-text-title-caption">BARISTA BRO - The Coffee People</p>
        </div>
        <div className="app-sy-12">
          <AppFormTextField
            name="username" 
            label="Username"
            placeholder="Username..."
            value={credentials.username}
            error={findErrorByName(error, "username")}
            onChange={handleChange}
          />
          <AppFormPasswordTextField
            name="password"
            label="Password"
            placeholder="Password..."
            value={credentials.password}
            error={findErrorByName(error, "password")}
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
    </AppCenteredLayout>
  )
}

export default LoginPage;
