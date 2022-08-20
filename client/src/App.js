import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import NotFound from './containers/NotFound'
import Dashboard from './containers/Dashboard'
import { UserProvider } from './contexts/UserContext'
import Guard from './guards/Guard'
import IsLoggedInGuard from './guards/IsLoggedInGuard'
import IsLoggedOutGuard from './guards/IsLoggedOutGuard'

const routes = [
  { path: '/', view: <Dashboard />, exact: true, guards: [IsLoggedInGuard] },
  { path: '/signin', view: <Signin />, exact: true, guards: [IsLoggedOutGuard] },
  { path: '/signup', view: <Signup />, exact: true, guards: [IsLoggedOutGuard] },
  { path: '*', view: <NotFound />, exact: false, guards: [] },
]

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <Guard route={route}>{route.view}</Guard>
                </>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
export default App
