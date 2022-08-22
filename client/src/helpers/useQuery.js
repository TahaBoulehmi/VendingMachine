import { useCallback, useEffect, useState, useRef, createElement, useMemo } from 'react'
import Notification from '../components/Notification'

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
  console.log(errors)
  const errorAlertProps = useMemo(
    () => ({
      isOpen: errors ? true : false,
      onCancel: () => setErrors(undefined),
      message: String(errors),
      type: 'Error',
    }),
    [errors]
  )
  const ErrorAlert = useMemo(
    () =>
      function ErrorAlertFactory(props) {
        return createElement(Notification, { ...errorAlertProps, ...props })
      },
    [errorAlertProps]
  )

  const successAlertProps = useMemo(
    () => ({
      isOpen: isQuerySuccessful,
      onCancel: () => setIsQuerySuccessful(false),
      type: 'Success',
    }),
    [isQuerySuccessful]
  )

  const SuccessAlert = useMemo(
    () =>
      function SuccessAlertFactory(props) {
        return createElement(Notification, {
          ...successAlertProps,
          ...props,
        })
      },
    [successAlertProps]
  )

  const runQuery = useCallback(
    fetcher => {
      setIsRunningQuery(true)
      setIsQuerySuccessful(false)
      setResult()
      setData()
      setErrors()

      return fetcher()
        .then(async response => {
          setResult(response)

          if (response.status === 200) return response.json()
          else {
            const errorToThrow = await response.json()
            throw new Error(errorToThrow.message)
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
    SuccessAlert,
    isRunningQuery,
    isError: errors != null,
    errorAlertProps,
    ErrorAlert,
    clearErrors: () => setErrors(undefined),
  }
}

export default useQuery
