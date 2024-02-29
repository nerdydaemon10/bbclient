import BaseTextField from "./BaseTextField.jsx";

function UsernameTextField(props) {
  return (
    <BaseTextField 
      name={props.name}
      label={props.label}
      placeholder={props.placeholder}
      errorMessage={props.errorMessage}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default UsernameTextField