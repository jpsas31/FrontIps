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
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Box from '@mui/material/Box'
import Horas from '../components/Horas'
import { useNavigate } from 'react-router'
// import { width } from '@mui/system'

export default function SolicitarCita ({ authId }) {
  const { handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const {
    getInfoPaciente,
    createCita,
    getCitasByMedico,
    getCitaMedios
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
  const [horas, setHoras] = useState({})
  const [horasSeleccionadas, setHorasSeleccionadas] = useState({})
  const [medios, setMedios] = useState({})
  const [medioSeleccionado, setMedioSeleccionado] = useState({})
  const [error, setError] = useState(false)
  const [precio, setPrecio] = useState({ id_tipocita: '1', precio: 30000, tipo: 'General' })
  const { user } = useAuth0()
  const handleDiaClose = () => {
    setError(false)
  }

  useEffect(() => {
    console.log('entrando a dia selecionado')
    if (JSON.stringify(diaSeleccionado) !== '{}' &&
    JSON.stringify(dias) !== '{}' &&
    dias.length !== 0 &&
    JSON.stringify(medicoSelecccionado) !== '{}') {
      getCitasByMedico({ id_trabajador: medicoSelecccionado, fecha: diaSeleccionado })
        .then(async (res) => { setHoras(Horas(dias, diaSeleccionado, res)) })
    } else {
      setHoras([{}])
      // console.log(horas, 'maldita sea')
    }
  }, [diaSeleccionado])

  useEffect(() => {
    if (JSON.stringify(medioSeleccionado) !== '{}') {
      setMedioSeleccionado(medios[0])
    } else {
      setMedioSeleccionado([{}])
    }
  }, [medios])

  useEffect(() => {
    // console.log('entrando a dias')
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
    // getCitaMedios(tipoEspecialidad, setMedios)
  }, [tipoEspecialidad])

  useEffect(() => {
    getInfoPaciente(user.sub, setPaciente)
    getMedicosByEspecialidad(tipoEspecialidad, setMedicos)
    getCitaMedios(tipoEspecialidad, setMedios)
    console.log('medios :', medios[0])
  }, [])

  const tipoCita = [
    { value: '1', label: 'General' },
    { value: '2', label: 'Psicologia' },
    { value: '3', label: 'Pediatria' },
    { value: '4', label: 'Cardiologia' },
    { value: '5', label: 'Dermatologia' },
    { value: '6', label: 'Oftalmologia' }]

  const { logout } = useAuth0()
  const nav = useNavigate()

  const onSubmit = data => {
    if (JSON.stringify(diaSeleccionado[0]) === '{}' ||
    medicoSelecccionado[0] === '0' ||
    JSON.stringify(horasSeleccionadas) === '{}') {
      console.log('Ta vacio')
      setError(true)
    } else {
      data.precio = precio.precio + medioSeleccionado.precio
      data.id_mediocita = medioSeleccionado.id_mediocita
      data.id_paciente = paciente.id_paciente
      data.id_trabajador = medicoSelecccionado
      if (JSON.stringify(data.horasSeleccionadas) !== '{}') {
        data.hora_entrada = horasSeleccionadas.fecha
        console.log(horasSeleccionadas)
        console.log(horasSeleccionadas.fecha)
        const horaAux = horasSeleccionadas.fechaDate.getTime() + 1800000
        data.hora_salida = new Date(horaAux).toString().split(' ')[4]
        createCita(data)
        nav('/Dashboard')
      }
      console.log(data)
    }
  }

  if (JSON.stringify(paciente) === '{}' ||
  JSON.stringify(medicoSelecccionado) === '{}' ||
  JSON.stringify(medicos) === '{}' ||
  JSON.stringify(dias) === '{}' ||
  JSON.stringify(medios) === '{}'
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
                label="Via"
                value={medioSeleccionado}
                {...registro('id_mediocita', { required: true })}
                onChange = {(e) => { setMedioSeleccionado(e.target.value) } }
              >
                {medios.map((option) => (
                  <MenuItem key={option.id_mediocita} value={option}>
                    {option.medio}
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
        {
          <TextField
          select
          fullWidth
          label="Hora"
          value = {horasSeleccionadas}
          {...registro('hora_entrada', { required: true })}
          onChange = {(e) => { setHorasSeleccionadas(e.target.value) }}
        >
          {horas.map((option) => (
            <MenuItem key={option.fecha} value={option}>
              {option.fecha}
            </MenuItem>))}
        </TextField>
        }
        </Grid>

        <Grid item xs = {5}>
          <TextField fullWidth id="precio" label="Precio" variant="outlined" value={precio.precio + medioSeleccionado.precio}
            {...registro('precio', { required: true })} InputProps={{ readOnly: true }}/>
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

        <Grid item xs = {5}>
        <Dialog open = {error} onClose = {handleDiaClose}>
            <DialogTitle id='alert-dialog-title'>
              {'Error'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Por favor rellene todos los datos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDiaClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Grid>

      </Grid></Paper>
    </form>

    </div>

  </div>
    )
  }
}
