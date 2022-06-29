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
import { AccessControlLevel, useExternalApi } from '../hooks/InfoAdminResponse'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import { useAuth0 } from '@auth0/auth0-react'

export default function InfoAdmin (props) {
  const { handleSubmit: getInfoAdminSubmit, register: registro } = useForm()
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    // apiResponseAdmin,

    getInfoAdmin,
    updateAdmin
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [admin, setAdmin] = useState({})
  const [message, setMessage] = useState('')
  const { user } = useAuth0()

  useEffect(() => {
    getInfoAdmin(user.sub, setAdmin)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updateAdmin(data, user.sub, setMessage)
    handleClickOpen()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleClickOpen = () => { setVisible(true) }
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setVisible(false)
    setMessage('')
  }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const cargos = [{ value: 1, label: 'Admin' }, { value: 2, label: 'Médico' }]

  if (JSON.stringify(admin) === '{}') {
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
            <form onSubmit = {getInfoAdminSubmit(onSubmit)}>
              <div>
                <TextField
                  select
                  label="Identificación"
                  defaultValue = {admin.tipo_id}
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
                  defaultValue = {admin.identificacion}
                  {...registro('identificacion', { required: true })}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Nombre"
                  defaultValue = {admin.nombre}
                  {...registro('nombre', { required: true })}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Apellido"
                  defaultValue = {admin.apellido}
                  {...registro('apellido', { required: true })}
                  sx={{ mx: 1, my: 2, width: '30ch' }}
                />
              </div>
              <div>
              <Grid container >
                  <TextField
                      select
                      label="Cargo"
                      defaultValue = {admin.tipo_id_cargo}
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
                    defaultValue = {admin.direccion}
                    {...registro('direccion', { required: true })}
                    sx={{ mx: 1, my: 2, width: '30ch' }}
                  />
                  <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Teléfono"
                    type = "number"
                    defaultValue={admin.telefono}
                    {...registro('telefono', { required: true })}
                  />
                </Grid>
              </div>
              <div>
                <TextField
                  label="Correo Electrónico"
                  type = "email"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={admin.correo}
                  {...registro('correo', { required: true })}
                  sx={{ mx: 1, my: 2, width: '40ch' }}
                />
                <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Salario"
                    type = "number"
                    defaultValue={admin.salario}
                    InputProps={{
                      readOnly: true
                    }}
                    {...registro('salario', { required: true })}
                  />
              </div>
            </form>
          </Paper>
        </Container>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button variant = 'contained' onClick={ getInfoAdminSubmit(onSubmit) } className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` } >Actualizar Información</Button>
        </Box>

        <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
          <DialogTitle>Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {isLoading && <CircularProgress />}
            {!isLoading && message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled = {message === ''} variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
