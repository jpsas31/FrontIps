import MainWindow from './MainWindow'
import React from 'react'
import Inicio from './inicio/Inicio'
import Personal from './personal/Personal'
import ActivaUser from './personal/activaUser'
import ProtectedRoute from './auth0/ProtectedRoute'
import ExternalApi from './external-api'
import Blog from './blog/Blog'
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
      <Route path="personal" element={<Personal/>} />
      <Route path="activa" element = {<ActivaUser/>} />
    </Route>
  </Routes>
  )
}
