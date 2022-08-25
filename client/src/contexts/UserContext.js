import { createContext, useEffect, useState } from 'react'
import { endpoints } from '../helpers/queries'
import useQuery from '../helpers/useQuery'
import { signout } from '../helpers/queries'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const { runQuery } = useQuery()

  useEffect(() => {
    window.io.socket.get(endpoints.authenticate.api, data => {
      console.log('get socket', data)
      setUser(data)
    })
    window.io.socket.on('userinfo', data => {
      console.log('userinfo')
      setUser(data)
    })

    window.io.socket.on('logout', async () => {
      await runQuery(() => signout())
      setUser({})
    })
    return () => {
      window.io.socket.off('userinfo')
      window.io.socket.off('logout')
    }
  }, [user.id])

  const { Provider } = UserContext
  return <Provider value={{ user, setUser }}>{children}</Provider>
}
