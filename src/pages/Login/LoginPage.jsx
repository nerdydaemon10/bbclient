import "boxicons"
import { useState } from "react";


import AppCenteredLayout from "../../layouts/AppCenteredLayout.jsx"
import UsernameTextField from "../../components/inputs/UsernameTextField.jsx"
import PasswordTextField from "../../components/inputs/PasswordTextField.jsx"
import AppSubmitButton from "../../components/buttons/AppSubmitButton.jsx";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  return (
    <AppCenteredLayout>
      <form className="w-25 app-sy-16">
        <div>
          <h1 className="app-text-title">Login an account</h1>
          <p className="app-text-title-caption">BARISTA BRO - The Coffee People</p>
        </div>
        <div className="app-sy-8">
          <UsernameTextField 
            name="username" 
            label="Username"
            placeholder="Username..."
            value={credentials.username}
            errorMessage={""}
            onChange={handleChange}
          />
          <PasswordTextField
            name="password" 
            label="Password"
            placeholder="Password..."
            value={credentials.password}
            errorMessage={""}
            onChange={handleChange}
          />
          <AppSubmitButton text="Login" state="idle" />
        </div>
        <div className="text-center">
          <p className="app-text-footer">&copy; Diamond Tech I.T. Solutions</p>
        </div>
      </form>
    </AppCenteredLayout>
  )
}

export default LoginPage