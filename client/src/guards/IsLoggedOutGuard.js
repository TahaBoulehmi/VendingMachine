import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

// This Guard Component checks if the user is logged out
const IsLoggedOutGuard = props => {
  const { user } = useContext(UserContext)

  if (!user || !user.id) {
    return props.children
  }

  return <Navigate to="/" />
}

export default IsLoggedOutGuard
