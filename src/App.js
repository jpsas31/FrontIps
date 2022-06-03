import MainWindow from './MainWindow'
import React from 'react'
import Inicio from './inicio/Inicio'
import ProtectedRoute from './auth0/ProtectedRoute'
import ExternalApi from './external-api'
import Perfil from './paciente/Perfil'
import RegMedicos from './medicos/RegMedicos'
import RegAdmin from './admin/RegAdmin'
import Blog from './blog/Blog'
// import  DemoApp from './calendario/DemoApp'
import {

  Routes,
  Route
} from 'react-router-dom'

export default function App () {
  return (
    <Routes>
    <Route path="/" element={<Blog/>}/>

    <Route path="/Dashboard"element={<ProtectedRoute component={MainWindow} />}>
      <Route
        index
        element={
          <Inicio />
        }
      />
      <Route path="data" element={<ExternalApi />} />
      <Route path="inicio" element={<Inicio />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="medicos" element={<RegMedicos />} />
      <Route path="admin" element={<RegAdmin />} />
    </Route>

  </Routes>
  )
}
