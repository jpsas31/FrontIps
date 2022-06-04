import * as React from 'react'
import Typography from '@mui/material/Typography'
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
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import CircularProgress from '@mui/material/CircularProgress'

/*
// import Box from '@mui/material/Box'
*/

export default function InfoPaciente (props) {
  const { handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const { handleSubmit: getPwPopUp, register: registro1 } = useForm()
  const {
    createPaciente
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    getInfoPaciente('1', setPaciente)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updatePaciente(data)
    handleClickOpen2()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleClickOpen = () => { setVisible(true) }
  const handleClickOpen2 = () => { setVisible2(true) }
  const handleClose2 = () => { setVisible2(false) }
  const handleClose = () => { setVisible(false) }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [{ value: 'Santiago de Cali', label: 'Santiago de Cali' }]

  if (JSON.stringify(paciente) === '{}') {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    )
  } else {
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <>
        <AccountCircleIcon sx = {{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
          Mi información personal
        </Typography>
        <Container maxWidth = 'md' sx={{ borderRadius: '30px', border: 2, display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          <form onSubmit = {getInfoPacienteSubmit(onSubmit)} style ={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <div>
            <TextField
              select
              label="Identificación"
              defaultValue = 'C.C'
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
              defaultValue = {paciente.id_paciente}
              {...registro('id_paciente', { required: true })}
              InputProps={{
                readOnly: true
              }}
              sx={{ mx: 1, my: 2, width: '20ch' }}
            />
            <TextField
              label="Nombre"
              defaultValue = 'Kevin David'
              InputProps={{
                readOnly: true
              }}
              {...registro('nombre', { required: true })}
              sx={{ mx: 1, my: 2, width: '20ch' }}
            />
            <TextField
              label="Apellido"
              defaultValue = 'Rodriguez Belalcazar'
              {...registro('apellido', { required: true })}
              InputProps={{
                readOnly: true
              }}
              sx={{ mx: 1, my: 2, width: '30ch' }}
            />
          </div>
          <div>
            <TextField
              id="textfield-direccion"
              label="Dirección"
              defaultValue = 'Cll 62B#1a9-80'
              {...registro('direccion', { required: true })}
              sx={{ mx: 1, my: 2, width: '30ch' }}
            />
            <TextField
              select
              label="Ciudad"
              defaultValue = 'Santiago de Cali'
              {...registro('ciudad', { required: true })}
              sx={{ mx: 1, my: 2, width: '30ch' }}
              >
                {ciudades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
            </TextField>
            <TextField
              label="Teléfono"
              defaultValue='3135036855'
              {...registro('telefono', { required: true })}
              sx={{ mx: 1, my: 2, width: '20ch' }}
            />
          </div>
          <div>
            <TextField
              label="Fecha de nacimiento"
              defaultValue='2001-09-10'
              {...registro('nacimiento', { required: true })}
              sx={{ mx: 1, my: 2, width: '20ch' }}
            />
              <TextField
                label="Edad"
                defaultValue='20'
                {...registro('edad', { required: true })}
                sx={{ mx: 1, my: 2, width: '15ch' }}
              />
              <TextField
                label="Correo Electrónico"
                defaultValue='kevin.rodriguez109@gmail.com'
                {...registro('correo', { required: true })}
                sx={{ mx: 1, my: 2, width: '40ch' }}
              />
            </div>
          </form>
        </Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button variant = 'contained' onClick={handleClickOpen} >Cambiar contraseña</Button>
          <Dialog open={visible} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Cambiar contraseña</DialogTitle>
            <DialogContent>
              <form onSubmit = {getPwPopUp(onSubmit)}>
                <DialogContentText>
                  Contraseña actual
                </DialogContentText>
                <TextField
                      autoFocus
                      margin="dense"
                      label=""
                      type="password"
                      fullWidth
                      variant="standard"
                      {...registro1('fieldnewPw', { required: false })}
                />
                <DialogContentText>
                  Repita nueva contraseña
                </DialogContentText>
                <TextField
                      autoFocus
                      margin="dense"
                      label=""
                      type="password"
                      fullWidth
                      variant="standard"
                      {...registro1('newPw1', { required: false })}
                />
                <DialogContentText>
                Repita nueva contraseña
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label=""
                  type="password"
                  fullWidth
                  variant="standard"
                  {...registro1('newPw2', { required: false })}
                />
                </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={getPwPopUp(onSubmit)}>Cambiar</Button>
            </DialogActions>
          </Dialog>
          <Button variant = 'contained' onClick={ getInfoPacienteSubmit(onSubmit) } className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` } >Actualizar Información</Button>
        </Box>
        <Dialog onClose={handleClose2} open={visible2} fullWidth maxWidth="xs">
          <DialogTitle>Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {isLoading && <CircularProgress />}
            {!isLoading && apiResponse}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose2}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
