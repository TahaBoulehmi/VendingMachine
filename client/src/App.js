import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import NotFound from './containers/NotFound'
import Dashboard from './containers/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
