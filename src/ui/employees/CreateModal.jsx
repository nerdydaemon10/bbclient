/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Modal, PasswordFieldInput, TextFieldInput } from "../common"
import { enqueueSnackbar } from "notistack"
import { ModalType, GenericMessage } from "../../util/classes"
import { closeModal } from "../redux/employeesSlice.js"
import { useCreateEmployeeMutation } from "../../data/services/employees.js"
import InputHelper from "../../util/helpers/InputHelper.js"

const param = {
  full_name: "",
  username: "",
  password: ""
}

function CreateModal() {
  const [employee, setEmployee] = useState({...param})
  const { isCreateModalOpen } = useSelector((state) => state.employees)

  const [createEmployee, { isLoading, isSuccess, error }] = useCreateEmployeeMutation()
  
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal(ModalType.CREATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    createEmployee(employee)
  }

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.CREATE))
    enqueueSnackbar(GenericMessage.EMPLOYEE_ADDED)
    setEmployee({...param})
  }, [isSuccess])

  return (
    <Modal 
      title="Create Employee"
      size="xs"
      isLoading={isLoading}
      isOpen={isCreateModalOpen} 
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
          feedback={InputHelper.getErrorByName(error, "username")}
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

export default CreateModal