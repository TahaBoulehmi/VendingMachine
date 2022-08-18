import { createContext } from 'react'

export const UserContext = createContext({ isLoggedIn: false })

export const UserProvider = ({ children }) => {
  const user = { isLoggedIn: true }

  const { Provider } = UserContext
  return <Provider value={user}>{children}</Provider>
}
