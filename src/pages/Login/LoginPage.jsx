import "boxicons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppCenteredLayout from "../../layouts/AppCenteredLayout.jsx";
import UsernameTextField from "../../components/inputs/UsernameTextField.jsx";
import PasswordTextField from "../../components/inputs/PasswordTextField.jsx";
import AppSubmitButton from "../../components/buttons/AppSubmitButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authSlice.jsx";
import StringHelper from "../../utils/helpers/StringHelper.jsx";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, accessToken } = useSelector((state) => state.auth);

  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if(accessToken !== null) {
      navigate('/home/')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(credentials));
      navigate("/home/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AppCenteredLayout>
      <form className="w-25 app-sy-16" onSubmit={handleSubmit}>
        <div>
          <h1 className="app-text-title">Login</h1>
          <p className="app-text-title-caption">Barista Bro - The Coffee People</p>
        </div>
        <div className="app-sy-8">
          <UsernameTextField 
            name="username" 
            label="Username"
            placeholder="Username..."
            value={credentials.username}
            errorMessage={StringHelper.extractErrorsFromError("username", error)}
            onChange={handleChange}
          />
          <PasswordTextField
            name="password"
            label="Password"
            placeholder="Password..."
            value={credentials.password}
            errorMessage={StringHelper.extractErrorsFromError("password", error)}
            onChange={handleChange}
          />
          <AppSubmitButton text="Login" state={status} />
        </div>
        <div className="text-center">
          <p className="app-text-footer">&copy; Diamond Tech I.T. Solutions</p>
        </div>
      </form>
    </AppCenteredLayout>
  );
}

export default LoginPage;
