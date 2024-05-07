const FetchResponse = {
  Idle: () => { 
    return { isLoading: false, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
  },
  Pending: () => {
    return { isLoading: true, isLoaded: false, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
  },
  Fulfilled: (payload = null) => {
    return { isLoading: false, isLoaded: true, data: payload.data, meta: payload.meta, error: null }
  },
  Rejected: (payload = null) => {
    return { isLoading: false, isLoaded: false, data: [], meta: { current_page: 0, last_page: 0 }, error: payload }
  }
}

export default FetchResponse