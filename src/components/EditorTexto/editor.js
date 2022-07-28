import React, { useEffect, useState } from 'react'
import Editor from './EditorUse'
import { Box, Container, Grid, Typography, TextField, Button, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export default function TextEditor ({ paciente, doctor, aparezco, functionCrear, update }) {
  const [fecha, setFecha] = useState('')
  const [errorFecha, setErrorFecha] = useState(true)
  const [texto, setTexto] = useState('')
  const [errorTexto, setErrorTexto] = useState(false)
  const [errorG, setErrorG] = useState(false)
  const [texto1, setTexto1] = useState('')

  useEffect(() => {
    if (texto === '') {
      setErrorTexto(true)
    } else {
      setErrorTexto(false)
    }
  }, [texto])

  const handleSubmit = () => {
    if (errorFecha || errorTexto) {
      setErrorG(true)
    } else {
      setErrorG(false)

      const fechaFix = new Date(fecha)
      // eslint-disable-next-line no-new-object
      const objCons = new Object()
      objCons.id_trabajador = doctor.id_trabajador
      objCons.id_paciente = paciente.id_paciente

      objCons.descripcion_form = JSON.stringify(texto1)
      objCons.descripcion = JSON.stringify(texto)
      objCons.fecha = fechaFix.toISOString()

      functionCrear(objCons)
        .then(res => {
          update()
        })
      aparezco()
    }
  }
  return (
    <div>
      <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Box sx={{ maxWidth: 'false', pb: 'false' }}>
          <Grid container spacing={3}><Grid item xs={12}><Typography variant='h4' textAlign='center' sx={{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Nueva entrada médica </Typography></Grid></Grid>
        </Box>
        <Box sx={{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
          <Grid container spacing={3}>
            <Grid item xs={8}><Typography variant='h5' sx={{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold', color: '#bdbdbd' }}> Fecha: </Typography></Grid>
            <Grid item xs={4}><TextField type='date' value={fecha} sx={{ ml: '5rem', mt: '1rem', mb: '1rem' }}
              onChange={(e) => {
                setFecha(e.target.value)
                if (e.target.value === '') {
                  setErrorFecha(true)
                } else {
                  setErrorFecha(false)
                }
              }}
            /></Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h5' sx={{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', color: '#bdbdbd', borderBottom: 1, borderColor: '#bdbdbd' }}> Información del médico </Typography></Grid>
            <Grid item xs={2}><TextField disabled label='Tipo id' value={doctor.tipo_id} sx={{ ml: '2rem', mb: '1rem' }} /></Grid>
            <Grid item xs={4}><TextField disabled label='Identificacion' value={doctor.identificacion} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={3}><TextField disabled label='Nombre' value={doctor.nombre} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={3}><TextField disabled label='Apellido' value={doctor.apellido} sx={{ mr: '1rem', mb: '1rem' }} /></Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h5' sx={{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', color: '#bdbdbd', borderBottom: 1, borderColor: '#bdbdbd' }}> Información del paciente </Typography></Grid>
            <Grid item xs={2}><TextField disabled label='Tipo id' value={paciente.tipo_id} sx={{ ml: '2rem', mb: '1rem' }} /></Grid>
            <Grid item xs={3}><TextField disabled label='Identificacion' value={paciente.identificacion} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={2}><TextField disabled label='Nombre' value={paciente.nombre} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={3}><TextField disabled label='Apellido' value={paciente.apellido} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={2}><TextField disabled label='Edad' value={paciente.edad} sx={{ mr: '1rem', mb: '1rem' }} /></Grid>
            <Grid item xs={4}><TextField disabled label='Correo' value={paciente.correo} sx={{ ml: '2rem', mb: '1rem' }} /></Grid>
            <Grid item xs={4}><TextField disabled label='Direccion' value={paciente.direccion} sx={{ mb: '1rem' }} /></Grid>
            <Grid item xs={4}><TextField disabled label='Telefono' value={paciente.telefono} sx={{ mr: '1rem', mb: '1rem' }} /></Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
          <Grid container spacing={3} >
            <Grid item xs={12}><Typography variant='h5' sx={{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Descripción de entrada medica </Typography></Grid>
            <Grid item xs={12}><Typography variant='h6' sx={{ mr: '1rem', ml: '1rem' }}> Ingrese la descripción de la entrada médica: </Typography></Grid>
            <Grid item xs={12} sx={{ mr: '1rem', ml: '1rem', mb: '1rem' }}><Editor titulo='Antecedentes' texto={texto} setTexto={setTexto} /></Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
          <Grid container spacing={3} >
            <Grid item xs={12}><Typography variant='h5' sx={{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Descripción de fórmula </Typography></Grid>
            <Grid item xs={12}><Typography variant='h6' sx={{ mr: '1rem', ml: '1rem' }}> Ingrese la descripción de la formula medica: </Typography></Grid>
            <Grid item xs={12} sx={{ mr: '1rem', ml: '1rem', mb: '1rem' }}><Editor titulo='Antecedentes' texto={texto1} setTexto={setTexto1} /></Grid>
          </Grid>
        </Box>
        <Box textAlign='center'>
          {errorG && <Alert variant="outlined" severity="error"> Hay campos vacios: Descripcion de entrada o fecha — ¡Reviselos! </Alert>}
        </Box>
        <Box textAlign='center'>
          <Button variant='contained' onClick={aparezco} sx={{ mt: '2rem', mb: '1rem', mr: '1rem' }}> CANCELAR </Button>
          <Button variant='contained'
            onClick={(e) => {
              handleSubmit()
            }}
            endIcon={<SendIcon />} sx={{ mt: '2rem', mb: '1rem' }}>ENVIAR HISTORIA</Button>
        </Box>
      </Container>
    </div>
  )
}
