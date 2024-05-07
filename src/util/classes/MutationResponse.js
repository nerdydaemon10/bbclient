const MutationResponse = {
  Idle: () => { 
    return { isLoading: false, isSuccess: false, data: null, error: null } 
  },
  Pending: () => {
    return { isLoading: true, isSuccess: false, data: null, error: null }
  },
  Fulfilled: (payload = null) => {
    return { isLoading: false, isSuccess: true, data: payload, error: null }
  },
  Rejected: (payload = null) => {
    return { isLoading: false, isSuccess: false, data: null, error: payload }
  }
}

export default MutationResponse