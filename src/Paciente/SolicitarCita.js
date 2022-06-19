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
import Dias from '../components/Dia'
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
  const [medicos, setMedicos] = useState([{ id_trabajador: 'generico', trabajador: { nombre: 'patata' } }])
  const [medicoSelecccionado, setMedicoSeleccionado] = useState({})
  const [tipoEspecialidad, setTipoEspecialidad] = useState(1)
  const [dias, setDias] = useState([{ id_trabajador: 'generico1', inicioturno: 'a buena hora' }])
  const [diaSeleccionado, setDiaSeleccionado] = useState({})
  const [horas, setHoras] = useState([{ id_trabajador: 'generico3', horas: 'las horas del corazon' }])
  const [precio, setPrecio] = useState({ id_tipocita: '1', precio: 30000, tipo: 'General' })
  const { user } = useAuth0()

  useEffect(() => {
    console.log('Entrando')
  }, [diaSeleccionado])

  useEffect(() => {
    getTurnosByMedico(medicoSelecccionado)
      .then(res => {
        setDias(Dias(res))
        console.log(res)
      })
  }, [medicoSelecccionado])

  useEffect(() => {
    if (tipoEspecialidad === false) {
      console.log('No llego ni mierda')
    } else {
      console.log(tipoEspecialidad, 'Soy un mujeriego')
      getMedicosByEspecialidad(tipoEspecialidad)
        .then(res => {
          setMedicos(res)
        },
        console.log(medicos)
        )
      getCitasByEspecialidad(tipoEspecialidad)
        .then(res => {
          setPrecio(res)
        },
        console.log(precio))
    }
  }, [tipoEspecialidad])

  useEffect(() => {
    getInfoPaciente(user.sub, setPaciente)
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

  if (JSON.stringify(paciente) === '{}') {
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
                defaultValue = {diaSeleccionado}
                onChange = {(e) => { setDiaSeleccionado(e.target.value) }}
                {...registro('fecha', { required: true })}
              >
                {dias.map((option) => (
                  <MenuItem key={option.id_turno} value={option.dia}>
                    {option.dia}
                  </MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs = {5}>
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
          </TextField>
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
