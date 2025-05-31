import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Pages/AdminPage'
import Login from './Pages/Login'
function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminPage/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
