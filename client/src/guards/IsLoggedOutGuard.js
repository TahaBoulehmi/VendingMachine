import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

// This Guard Component checks if the user is logged out
const IsLoggedOutGuard = props => {
  const { isLoggedIn } = useContext(UserContext)

  if (!isLoggedIn) {
    return props.children
  }

  return <Navigate to="/" />
}

export default IsLoggedOutGuard
