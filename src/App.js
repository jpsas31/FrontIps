import MainWindow from './MainWindow'
import React from 'react'
import Inicio from './inicio/Inicio'
import Dashboard from './dashboard/Dashboard'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Loader } from './auth0/loader'
import Blog from './blog/Blog'
import {

  Routes,
  Route
} from 'react-router-dom'
const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args)
  return <Component />
}

export default function App () {
  return (
    <Routes>
    <Route path="/" element={<Blog/>}/>

    <Route path="/Dashboard"
    // element={<MainWindow/>}

    element={<ProtectedRoute component={MainWindow} />}
    >
      <Route
        index
        element={
          <Inicio />
        }
      />
      <Route path="data" element={<Dashboard />} />
      <Route path="inicio" element={<Inicio />} />
    </Route>

  </Routes>
  )
}
