import { createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const user = { id: 123, role: 0, username: 'btahadotcom' }

  const { Provider } = UserContext
  return <Provider value={user}>{children}</Provider>
}
