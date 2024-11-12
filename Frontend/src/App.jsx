import { Route, Routes } from 'react-router-dom'
import Header from './Component/Header/Header'
import AdminReg from './Component/Register/AdminReg'
import StudentReg from './Component/Register/StudentReg'
import  Login  from './Component/Register/Login'
import Layout from './Component/Layout/Layout'
import AdminPreview from './Component/AdminPreview/AdminPreview'
import HomeDash from './Component/Dashboard/HomeDash'
import StudentDashboard from './Component/Dashboard/StudentDashBoard'
import Room from './Component/Dashboard/Room'
 

function App() {
  const RenderRoute = () => (
    <Routes>
        <Route path='/' element={<AdminReg/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/studentreg' element={
          <Layout>
            <StudentReg/>
          </Layout>
        }/>
        <Route path='/adminprev' element={<AdminPreview/>}/>
        <Route path='/home-dash' element={
          <Layout>
            <HomeDash/>
          </Layout>
        }/>
        <Route path='/student-dash' element={<StudentDashboard/>}/>
        <Route path='/room' element={<Room/>}/>
    </Routes>
  )

  return (
    <>
    {RenderRoute()}
    </>
  )
}

export default App