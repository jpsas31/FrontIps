import MainWindow from './MainWindow'
import React, { useState } from 'react'
import Inicio from './inicio/Inicio'
import ProtectedRoute from './auth0/ProtectedRoute'
import Perfil from './paciente/Perfil'
import RegMedicos from './medicos/RegMedicos'
import RegAdmin from './admin/RegAdmin'
import Blog from './blog/Blog'
import Dashboard from './dashboard/Dashboard'
import AuthRedirect from './auth0/authRedirect'
import UserContext from './context/user.context'
// import  DemoApp from './calendario/DemoApp'
import {

  Routes,
  Route
} from 'react-router-dom'

export default function App () {
  const [userType, setUserType] = useState('')
  return (
    <UserContext.Provider value={[userType, setUserType]}>
      <Routes>
      <Route path="/" element={<Blog/>}/>

      <Route path="/Dashboard"element={<ProtectedRoute component={MainWindow} />}>
        <Route
          index
          element={
            <Inicio />
          }
        />
        <Route path="inicio" element={<Inicio />} />
        <Route path="data" element={<Dashboard />} />
        <Route path="RegistroPaciente" element={<AuthRedirect Component={Perfil} tipo='Paciente' />}/>
        <Route path="RegistroMedico" element={<AuthRedirect Component={RegMedicos} tipo= 'Medico' />} />
        <Route path="RegistroAdmin" element={<AuthRedirect Component={RegAdmin} tipo='Admin' />} />
      </Route>

    </Routes>
  </UserContext.Provider>
  )
}
