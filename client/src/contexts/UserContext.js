import { createContext, useEffect, useState } from 'react'
import { endpoints } from '../helpers/queries'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    window.io.socket.get(endpoints.authenticate.api, function gotResponse(data) {
      setUser(data)
    })
    window.io.socket.on('userinfo', function (data) {
      setUser(data)
    })
  }, [user.id])

  const { Provider } = UserContext
  return <Provider value={{ user, setUser }}>{children}</Provider>
}
