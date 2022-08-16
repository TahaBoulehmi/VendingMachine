import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import NotFound from './NotFound'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
