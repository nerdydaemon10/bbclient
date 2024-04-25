import OptionInput from "../inputs/OptionInput.jsx"
import Flex from "../layouts/Flex.jsx"

function AppFormOption({name, label, options, value, feedback, onChange}) {
  const { state, message } = feedback
  const variant = state == "is-valid"
    ? "valid"
    : "invalid"

    return (
      <Flex direction="column" gap="1">
        <label className="fw-medium">{label}</label>
        <OptionInput
          name={name}
          options={options}
          value={value}
          onChange={onChange}
        />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </Flex>
  )
}

export default AppFormOption