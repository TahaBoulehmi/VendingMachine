import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const { Provider } = UserContext
  return <Provider value={{ user, setUser }}>{children}</Provider>
}
