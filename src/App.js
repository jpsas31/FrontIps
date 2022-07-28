import MainWindow from './Main/MainWindow'
import React, { useState } from 'react'
import Inicio from './inicio/Inicio'
import ProtectedRoute from './auth0/ProtectedRoute'
import Perfil from './Paciente/RegPaciente'
import RegMedicos from './Medicos/RegMedicos'
import RegAdmin from './Admin/RegAdmin'
import Blog from './blog/Blog'
import InfoPaciente from './Paciente/InfoPaciente'
import InfoAdmin from './Admin/InfoAdmin'
import InfoUsuarios from './Admin/InfoUsuarios'
import InfoMedico from './Medicos/InfoMedico'
import Dashboard from './dashboard/Dashboard'
import AuthRedirect from './auth0/authRedirect'
import UserContext from './context/user.context'
import ActivaUser from './personal/activaUser'
import Calendario from './calendario/CalendarioMedicos'
import CitasTable from './Paciente/ListCitas'
import CitasTableAdmin from './Admin/ListCitas'
import CitasTableMedico from './Medicos/ListCitas'
import SolicitarCita from './Paciente/SolicitarCita'
import MedicosHM from './Medicos/MedHM'
import RegistroHM from './Paciente/RegistroHM'
import Archivos from './Paciente/Archivos'
import CitaIntervalo from './Admin/Reportes/CitaIntervalo'
import TurnosTop from './Admin/Reportes/ReportConfirm'
import CitasPorPaciente from './Admin/CitasPorPaciente'
import Cumpleanos from './Admin/Cumpleanos'

import CitasPorEspecialidad from './Admin/CitasPorEspecialidad'
import CitasPorMedio from './Admin/CitasPorMedio'

import {

  Routes,
  Route
} from 'react-router-dom'

export default function App () {
  const [userType, setUserType] = useState('')
  return (
    <UserContext.Provider value={[userType, setUserType]}>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/Dashboard" element={<ProtectedRoute component={MainWindow} />}>
          <Route
            index
            element={
              <Inicio />
            }
          />
          <Route path="inicio" element={<Inicio />} />
          <Route path="data" element={<Dashboard />} />
          <Route path="prueba-files" element={<Archivos />} />
          <Route path="info-paciente" element={<InfoPaciente />} />
          <Route path="turnos" element={<Calendario />} />
          <Route path="solicitar-cita" element={<SolicitarCita />} />
          <Route path="info-admin" element={<InfoAdmin />} />
          <Route path="info-medico" element={<InfoMedico />} />
          <Route path="listcitas" element={<CitasTable />} />
          <Route path="Admincitas" element={<CitasTableAdmin />} />
          <Route path="Medicocitas" element={<CitasTableMedico />} />
          <Route path="info-usuarios" element={<InfoUsuarios />} />
          <Route path="RegistroPaciente" element={<AuthRedirect Component={Perfil} tipo='Paciente' />} />
          <Route path="RegistroMedico" element={<AuthRedirect Component={RegMedicos} tipo='Medico' />} />
          <Route path="RegistroAdmin" element={<AuthRedirect Component={RegAdmin} tipo='Admin' />} />
          <Route path="activa" element={<ActivaUser />} />
          <Route path="RegistroHM" element={<MedicosHM />} />
          <Route path="entradas-hm" element={<RegistroHM />} />
          <Route path="citas-paciente-report" element = {<CitasPorPaciente/>} />
          <Route path="cumple-report" element = { <Cumpleanos/>} />
          <Route path="citas-medio-report" element = {<CitasPorMedio/>}/>
          <Route path="citas-especialidad-report" element = {<CitasPorEspecialidad/>}/>
          <Route path="cita-intervalo" element = {<CitaIntervalo/>}/>
          <Route path="turnostop" element = {<TurnosTop/>}/>
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}
