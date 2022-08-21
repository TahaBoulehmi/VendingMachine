import { useCallback, useEffect, useState, useRef } from 'react'

/**
 * This hook is used to simplify state involving network requests.
 * It provides serveral states that are describing the current status
 * of a network request.
 */
const useQuery = function (queryOptions) {
  const [errors, setErrors] = useState()
  const [data, setData] = useState()
  const [result, setResult] = useState()
  const [isRunningQuery, setIsRunningQuery] = useState(false)
  const [isQuerySuccessful, setIsQuerySuccessful] = useState(false)

  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true // Will set it to true on mount ...
    return () => {
      mounted.current = false
    } // ... and to false on unmount
  }, [])

  const runQuery = useCallback(
    fetcher => {
      setIsRunningQuery(true)
      setIsQuerySuccessful(false)
      setResult()
      setData()
      setErrors()

      return fetcher()
        .then(response => {
          setResult(response)

          if (response.status === 200) return response.json()
          else {
            throw new Error(response)
          }
        })
        .then(data => {
          if (mounted.current) {
            console.log(result)
            console.log(data)
            setData(queryOptions?.transformResult != null ? queryOptions.transformResult(data) : data)
            if (queryOptions?.saveToState != null) queryOptions.saveToState(data)
            setIsRunningQuery(false)
            setIsQuerySuccessful(true)
          }
        })
        .catch(err => {
          if (mounted.current) {
            console.log(err)
            setErrors(err)
            setIsRunningQuery(false)
            setIsQuerySuccessful(false)
          }
        })
    },
    [queryOptions]
  )

  return {
    data,
    runQuery,
    result,
    errors,
    isQuerySuccessful,
    setIsQuerySuccessful,
    isRunningQuery,
    isError: errors != null,
    clearErrors: () => setErrors(undefined),
  }
}

export default useQuery
