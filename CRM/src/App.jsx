import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Pages/AdminPage'
function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminPage/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
