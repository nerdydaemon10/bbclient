/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import client from "../utils/Client.jsx"

function useGet(endpoint) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await client.get(`${endpoint}`)
      
      setIsLoading(false)
      setData(response.data.data)
    } catch(error) {
      setIsLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) 

  return { data, error, isLoading }
}

export { useGet }