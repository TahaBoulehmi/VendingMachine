import { createContext, useEffect, useState } from 'react'
import { endpoints } from '../helpers/queries'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  useEffect(() => {
    window.io.socket.get(endpoints.authenticate.api, function gotResponse(body) {
      setUser(body)
    })
  }, [])
  const [user, setUser] = useState({})

  const { Provider } = UserContext
  return <Provider value={{ user, setUser }}>{children}</Provider>
}
