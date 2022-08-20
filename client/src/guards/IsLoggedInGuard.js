import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

// This Guard Component checks if the user is logged in
const IsLoggedInGuard = props => {
  const { user } = useContext(UserContext)

  if (user?.id) {
    return props.children
  }

  return <Navigate to="/signin" />
}

export default IsLoggedInGuard
