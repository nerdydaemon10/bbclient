import BasePasswordTextField from "./BasePasswordTextField.jsx";

function PasswordTextField(props) {
  return (
    <BasePasswordTextField 
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      errorMessage={props.errorMessage}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default PasswordTextField