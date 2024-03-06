function CreateModal({closeModal, confirmModal}) {
  return (
    <div className="app-modal-container">
      <form className="app-modal">
        <div className="app-modal-header">
          <h5>Create Product</h5>
        </div>
        <div className="app-modal-body">
        </div>
        <div className="app-modal-footer">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-dark">Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default CreateModal