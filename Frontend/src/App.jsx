
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminReg from './Component/Register/adminReg'
import Header from "./Component/Header/Header"
import StudentReg from "./Component/Register/StudentReg"
// import AdminReg from "./Component/Register/AdminReg"


function App() {
   const renderRoute = ()=>(
    <Routes>
      <Route path="/" element={<AdminReg/>}/>
    </Routes>

   )


  return (
    <>
      {renderRoute()}
    </>
  )
}

export default App
