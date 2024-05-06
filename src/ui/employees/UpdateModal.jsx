/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Modal, PasswordFieldInput, TextFieldInput } from "../common"
import { enqueueSnackbar } from "notistack"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { closeModal, setEmployee } from "../redux/employeesSlice.js"
import { useUpdateEmployeeMutation } from "../../data/services/employees.js"
import InputHelper from "../../util/helpers/InputHelper.js"

function UpdateModal() {
  const { employee, isUpdateModalOpen } = useSelector((state) => state.employees)
  const [updateEmployee, { isLoading, isSuccess, error }] = useUpdateEmployeeMutation()

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal(ModalType.UPDATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    updateEmployee(employee)
  }

  const handleChange = (e) => {
    dispatch(setEmployee({...employee, [e.target.name]: e.target.value}))
  }

  // success 
  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal(ModalType.UPDATE))
      enqueueSnackbar(GenericMessage.CUSTOMER_UPDATED)
    }
  }, [isSuccess])

  return (
    <Modal  
      title="Create Customer"
      size="xs"
      isLoading={isLoading}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="d-flex flex-column gap-2">
        <TextFieldInput 
          label="Full Name"
          name="full_name"
          placeholder="e.g., Juan Dela Cruz"
          value={employee.full_name}
          onChange={handleChange}
          feedback={InputHelper.getErrorByName(error, "full_name")}
        />
        <TextFieldInput 
          label="Username"
          name="username"
          placeholder="e.g., @juan10"
          value={employee.username}
          onChange={handleChange}
          feedback={InputHelper.getErrorByName(error, "userna")}
        />
        <PasswordFieldInput 
          label="Password"
          name="password"
          placeholder="Input password..."
          value={employee.password}
          onChange={handleChange}
          feedback={InputHelper.getErrorByName(error, "password")}
        />
      </div>
    </Modal>
  )
}

export default UpdateModal