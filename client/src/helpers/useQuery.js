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

      return fetcher()
        .then(response => {
          setResult(response)
          return response.json()
        })
        .then(data => {
          console.log(data)
          if (mounted.current) {
            setData(queryOptions?.transformResult != null ? queryOptions.transformResult(data) : data)
            setIsRunningQuery(false)
            setIsQuerySuccessful(true)
          }
        })
        .catch(err => {
          if (mounted.current) {
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
    isRunningQuery,
    isError: errors != null,
    clearErrors: () => setErrors(undefined),
  }
}

export default useQuery
