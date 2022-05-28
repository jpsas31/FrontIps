import MainWindow from './MainWindow'
import React from 'react'
import Inicio from './inicio/Inicio'
// import Dashboard from './dashboard/Dashboard'
import ProtectedRoute from './auth0/ProtectedRoute'
import ExternalApi from './external-api'
import Blog from './blog/Blog'
import InfoPaciente from './Paciente/InfoPaciente'
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
      <Route path="info-paciente" element={<InfoPaciente />} />
    </Route>

  </Routes>
  )
}
