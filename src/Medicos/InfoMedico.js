import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoMedicoResponse'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import { useAuth0 } from '@auth0/auth0-react'

export default function InfoMedico (props) {
  const { handleSubmit: getInfoMedicoSubmit, register: registro } = useForm()
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    apiResponse,

    getInfoMedico,
    updateMedico
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [medico, setMedico] = useState({})
  const { user } = useAuth0()

  useEffect(() => {
    getInfoMedico(user.sub, setMedico)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updateMedico(data, user.sub)
    handleClickOpen()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleClickOpen = () => { setVisible(true) }
  const handleClose = () => { setVisible(false) }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const cargos = [{ value: 1, label: 'Admin' }, { value: 2, label: 'Médico' }]
  const especialidades = [{ value: 1, label: 'General' }, { value: 2, label: 'Psicologia' }, { value: 3, label: 'Pediatria' }, { value: 4, label: 'Cardiologia' }, { value: 5, label: 'Dermatologia' }, { value: 6, label: 'Oftalmologia' }]

  if (JSON.stringify(medico) === '{}') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <>
        <AccountCircleIcon sx = {{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
          Mi información personal
        </Typography>

        <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          <Paper elevation = {8} sx = {{ padding: 6 }}>
            <form onSubmit = {getInfoMedicoSubmit(onSubmit)}>
              <div>
                <TextField
                  select
                  label="Identificación"
                  defaultValue = {medico.tipo_id}
                  {...registro('tipo_id', { required: true })}
                  sx={{ mx: 1, my: 2, width: '15ch' }}
                >
                  {tipoids.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>))}
                </TextField>
                <TextField
                  label="Número"
                  defaultValue = {medico.identificacion}
                  {...registro('identificacion', { required: true })}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Nombre"
                  defaultValue = {medico.nombre}
                  {...registro('nombre', { required: true })}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Apellido"
                  defaultValue = {medico.apellido}
                  {...registro('apellido', { required: true })}
                  sx={{ mx: 1, my: 2, width: '30ch' }}
                />
              </div>
              <div>
              <Grid container >
                  <TextField
                      select
                      label="Cargo"
                      defaultValue = {medico.tipo_id_cargo}
                      InputProps={{
                        readOnly: true
                      }}
                      {...registro('tipo_id_cargo', { required: true })}
                      sx={{ mx: 1, my: 2, width: '15ch' }}
                    >
                      {cargos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                  </TextField>
                  <TextField
                    id="textfield-direccion"
                    label="Dirección"
                    defaultValue = {medico.direccion}
                    {...registro('direccion', { required: true })}
                    sx={{ mx: 1, my: 2, width: '30ch' }}
                  />
                  <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Teléfono"
                    type = "number"
                    defaultValue={medico.telefono}
                    {...registro('telefono', { required: true })}
                  />
                  <TextField
                  label="Correo Electrónico"
                  type = "email"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={medico.correo}
                  {...registro('correo', { required: true })}
                  sx={{ mx: 1, my: 2, width: '40ch' }}
                />
                </Grid>
              </div>
              <div>
                <TextField
                      select
                      label="Especialidad"
                      defaultValue = {medico.medicos.id_especialidad}
                      InputProps={{
                        readOnly: true
                      }}
                      {...registro('id_especialidad', { required: true })}
                      sx={{ mx: 1, my: 2, width: '20ch' }}
                    >
                      {especialidades.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                  </TextField>
                <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Salario"
                    type = "number"
                    defaultValue={medico.salario}
                    InputProps={{
                      readOnly: true
                    }}
                    {...registro('salario', { required: true })}
                  />
                <a href='http://www.africau.edu/images/default/sample.pdf' download='prueba.pdf'>
                  <Button variant = 'contained' sx={{ mx: 1, my: 2, width: '20ch' }}>
                    Certificado
                  </Button>
                </a>
              </div>
            </form>
          </Paper>
        </Container>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button variant = 'contained' onClick={ getInfoMedicoSubmit(onSubmit) } className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` } >Actualizar Información</Button>
        </Box>

        <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
          <DialogTitle>Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {isLoading && <CircularProgress />}
            {!isLoading && apiResponse}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
