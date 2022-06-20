import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { useExternalApi as ApiPacientes } from '../hooks/InfoPacienteResponse'
import { useExternalApi as ApiMedicos } from '../hooks/InfoMedicoResponse'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Horas from '../components/Horas'
// import { useNavigate } from 'react-router'
// import { width } from '@mui/system'

export default function SolicitarCita ({ authId }) {
  const { handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const {
    getInfoPaciente
  } = ApiPacientes()

  const {
    getMedicosByEspecialidad,
    getCitasByEspecialidad,
    getTurnosByMedico
  } = ApiMedicos()

  const [paciente, setPaciente] = useState({})
  const [medicos, setMedicos] = useState({})
  const [medicoSelecccionado, setMedicoSeleccionado] = useState({})
  const [tipoEspecialidad, setTipoEspecialidad] = useState(1)
  const [dias, setDias] = useState({})
  const [diaSeleccionado, setDiaSeleccionado] = useState({})
  const [horas, setHoras] = useState([{ id_trabajador: 'generico3', horas: 'las horas del corazon' }])
  const [precio, setPrecio] = useState({ id_tipocita: '1', precio: 30000, tipo: 'General' })
  const { user } = useAuth0()

  useEffect(() => {
    console.log('entrando a dia selecionado')
    if (JSON.stringify(diaSeleccionado) !== '{}' && JSON.stringify(dias) !== '{}' && dias.length !== 0) {
      setHoras(Horas(dias, diaSeleccionado))
    }
  }, [diaSeleccionado])

  useEffect(() => {
    console.log('entrando a dias')
    if (JSON.stringify(dias) !== '{}' && dias.length !== 0) {
      setDiaSeleccionado(dias[0].dia)
    } else {
      setDiaSeleccionado([{}])
    }
  }, [dias])

  useEffect(() => {
    if (JSON.stringify(medicos) !== '{}') {
      if (medicos.length !== 0) {
        setMedicoSeleccionado(medicos[0].id_trabajador)
      } else {
        setMedicoSeleccionado('0')
      }
    }
  }, [medicos])

  useEffect(() => {
    getTurnosByMedico(medicoSelecccionado, setDias)
  }, [medicoSelecccionado])

  useEffect(() => {
    getMedicosByEspecialidad(tipoEspecialidad, setMedicos)
    getCitasByEspecialidad(tipoEspecialidad, setPrecio)
  }, [tipoEspecialidad])

  useEffect(() => {
    getInfoPaciente(user.sub, setPaciente)
    getMedicosByEspecialidad(tipoEspecialidad, setMedicos)
  }, [])

  const tipoCita = [
    { value: '1', label: 'General' },
    { value: '2', label: 'Psicologia' },
    { value: '3', label: 'Pediatria' },
    { value: '4', label: 'Cardiologia' },
    { value: '5', label: 'Dermatologia' },
    { value: '6', label: 'Oftalmologia' }]

  const horasInicio = [
    { value: '7:00', label: '7:00' },
    { value: '7:30', label: '7:30' },
    { value: '8:00', label: '8:00' }]

  const { logout } = useAuth0()
  // const nav = useNavigate()

  const onSubmit = data => {
    data.precio = precio.precio
    data.id_paciente = paciente.id_paciente
    console.log(data)
    // nav('/Dashboard')
  }

  if (JSON.stringify(paciente) === '{}' ||
  JSON.stringify(medicoSelecccionado) === '{}' ||
  JSON.stringify(medicos) === '{}' ||
  JSON.stringify(dias) === '{}'
  ) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    return (
  <div>
    <h1 align="center">Solicitar Cita</h1>
    <div align = "center">
    <form onSubmit={getInfoPacienteSubmit(onSubmit)}>
      <Paper width = '50%' elevation = {8} sx = {{ padding: 2 }} >
      <Grid container spacing={4} justifyContent="center" alignItems="center">

        <Grid item xs = {10}>
          <h2>Informacion del paciente</h2>
        </Grid>

        <Grid item xs = {10}>
          <TextField fullWidth id="id" label="Identificacion" defaultValue={paciente.identificacion} InputProps={{ readOnly: true }} name = "Identificacion" variant="outlined" type = "number"
          {...registro('identificacion', { required: true })}/>
        </Grid>

        <Grid item xs = {5} >
          <TextField fullWidth id="nombre" label="Nombre" defaultValue={paciente.nombre} InputProps={{ readOnly: true }} variant="outlined" type = "text"
          {...registro('nombre', { required: true })}/>
        </Grid>

        <Grid item xs = {5}>
          <TextField fullWidth id="apellido" label="Apellido" defaultValue={paciente.apellido} InputProps={{ readOnly: true }} variant="outlined"
          {...registro('apellido', { required: true })} />
        </Grid>

        <Grid item xs = {10}>
          <h2>Asignacion cita</h2>
        </Grid>

        <Grid item xs = {5}>
        <TextField
                select
                fullWidth
                label="Tipo de Cita"
                value={ tipoEspecialidad }
                {...registro('id_tipocita', { required: true })}
                onChange = {(e) => { setTipoEspecialidad(e.target.value) } }
              >
                {tipoCita.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs = {5}>
        <TextField
                select
                fullWidth
                label="Doctor"
                value={medicoSelecccionado}
                {...registro('id_trabajador', { required: true })}
                onChange = {(e) => { setMedicoSeleccionado(e.target.value) }}
              >
                {medicos.map((option) => (
                  <MenuItem key={option.id_trabajador} value={option.trabajador.id_trabajador}>
                    {option.trabajador.nombre}
                  </MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs = {5}>
        <TextField
                select
                fullWidth
                label="Dia"
                value = {diaSeleccionado}
                {...registro('fecha', { required: true })}
                onChange = {(e) => { setDiaSeleccionado(e.target.value) }}
              >
                {dias.map((option) => (
                  <MenuItem key={option.id_turno} value={option.dia}>
                    {option.dia}
                  </MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs = {5}>
        {/*
          <TextField
          select
          fullWidth
          label="Hora"
          value = {horas}
          {...registro('inicioturno', { required: true })}
        >
          {horasInicio.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>))}
        </TextField> */
        }
        </Grid>

        <Grid item xs = {5}>
          <TextField fullWidth id="precio" label="Precio" variant="outlined" value={precio.precio}
            {...registro('precio', { required: true })} InputProps={{ readOnly: true }}/>
        </Grid>

        <Grid item xs = {5}>
        </Grid>

        <Grid item xs = {5}>
          <Button variant="outlined" component={Link} to={'/'} onClick={() => logout({
            returnTo: window.location.origin
          })
        }>
          Atras</Button>
        </Grid>

        <Grid item xs = {5}>
          <Button variant="contained" type = "submit" onClick={getInfoPacienteSubmit(onSubmit)} >Enviar</Button>
        </Grid>

      </Grid></Paper>
    </form>

    </div>

  </div>
    )
  }
}
