/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Modal } from "../common"
import { enqueueSnackbar } from "notistack"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { useRemoveEmployeeMutation } from "../../data/services/employees.js"
import { closeModal } from "../redux/employeesSlice.js"

function RemoveModal() {
  const dispatch = useDispatch()

  const { employee, isRemoveModalOpen } = useSelector((state) => state.employees)
  const [removeEmployee, { isLoading, isSuccess }] = useRemoveEmployeeMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.REMOVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    removeEmployee(employee.id)
  }
  
  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.REMOVE))
    enqueueSnackbar(GenericMessage.EMPLOYEE_REMOVED)
  }, [isSuccess])

  return (
    <Modal  
      title="Remove Customer"
      isLoading={isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to remove <b>{employee.full_name}</b> from the records?
      </span>
    </Modal>
  )
}

export default RemoveModal