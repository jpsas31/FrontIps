import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoPacienteResponse'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'
import { useAuth0 } from '@auth0/auth0-react'
import { styled } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function InfoPaciente (props) {
  const { control, handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const {
    selectedAccessControlLevelPaciente,
    // apiEndpoint,
    // apiResponsePaciente,

    getInfoPaciente,
    updatePaciente,
    uploadFile,
    getFile
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pdfResponse, setPdfResponse] = useState('')
  const [message, setMessage] = useState('')
  const [paciente, setPaciente] = useState({})
  const { user } = useAuth0()
  const [file, setFile] = useState(null)

  const ciudades = [
    { value: 'Cali', label: 'Cali' },
    { value: 'Bogota', label: 'Bogota' },
    { value: 'Medellin', label: 'Medellin' }
  ]

  useEffect(() => {
    getInfoPaciente(user.sub, setPaciente)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updatePaciente(data, user.sub, setMessage)
    handleClickOpen()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const getPdf = () => {
    getFile(user.sub)
  }

  const Input = styled('input')({
    display: 'none'
  })

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const sendFile = () => {
    if (!file) {
      alert('Debes de cargar un archivo')
      return
    }

    const formdata = new FormData()
    formdata.append('archivo', file)
    formdata.append('usuario', user.sub)

    uploadFile(formdata, setPdfResponse)
    handleClickOpen2()

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  const handleClickOpen = () => {
    setVisible(true)
  }

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setVisible(false)
    setMessage('')
  }

  const handleClickOpen2 = () => { setVisible2(true) }
  const handleClose2 = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setVisible2(false)
    setMessage('')
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose2}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose2}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]

  if (JSON.stringify(paciente) === '{}') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <>
        <AccountCircleIcon sx={{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }} />

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
          Mi información personal
        </Typography>

        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          <Paper elevation={8} sx={{ padding: 6 }}>
            <form onSubmit={getInfoPacienteSubmit(onSubmit)}>
              <div>
                <TextField
                  select
                  label="Identificación"
                  defaultValue={paciente.tipo_id}
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
                  defaultValue={paciente.identificacion}
                  {...registro('identificacion', { required: true })}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Nombre"
                  defaultValue={paciente.nombre}
                  {...registro('nombre', { required: true })}
                  inputProps={{
                    maxLength: 25
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Apellido"
                  defaultValue={paciente.apellido}
                  inputProps={{
                    maxLength: 40
                  }}
                  {...registro('apellido', { required: true })}
                  sx={{ mx: 1, my: 2, width: '30ch' }}
                />
              </div>
              <div>
                <Grid container >
                  <TextField
                    id="textfield-direccion"
                    label="Dirección"
                    defaultValue={paciente.direccion}
                    inputProps={{
                      maxLength: 30
                    }}
                    {...registro('direccion', { required: true })}
                    sx={{ mx: 1, my: 2, width: '30ch' }}
                  />
                  <Controller
                    name="ciudad"
                    control={control}
                    defaultValue={paciente.ciudad}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id='ciudad'
                        options={ciudades}
                        getOptionLabel={(ciudad) => ciudad.label}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Ciudad"
                            sx={{ mx: 1, my: 2, width: '25ch' }}
                          />
                        )}
                        onChange={(_, data) => {
                          if (data === null) {
                            onChange(paciente.ciudad)
                            return paciente.ciudad
                          } else {
                            onChange(data.value)
                            return data.value
                          }
                        }}
                        defaultValue={{ value: paciente.ciudad, label: paciente.ciudad }}
                      />
                    )}
                  />
                  <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Teléfono"
                    type="number"
                    inputProps={{
                      maxLength: 15
                    }}
                    defaultValue={paciente.telefono}
                    {...registro('telefono', { required: true })}
                  />
                </Grid>
              </div>
              <div>
                <TextField
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                  defaultValue={paciente.nacimiento.split('T')[0]}
                  label="Nacimiento"
                  type="date"
                  InputProps={{
                    readOnly: true
                  }}
                  {...registro('nacimiento', { required: true })}
                />
                <TextField
                  label="Edad"
                  defaultValue={paciente.edad}
                  type="number"
                  InputProps={{
                    readOnly: true
                  }}
                  {...registro('edad', { required: true })}
                  sx={{ mx: 1, my: 2, width: '10ch' }}
                />
                <TextField
                  label="Correo Electrónico"
                  type="email"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={paciente.correo}
                  {...registro('correo', { required: true })}
                  sx={{ mx: 1, my: 2, width: '40ch' }}
                />
              </div>
              <div>
                <Typography
                  component="h2"
                  color="black"
                  align="left"
                  noWrap
                  sx={{ mx: 1 }}
                >
                  Antecedentes
                </Typography>
                <label htmlFor='fileinput'>
                  <Input onChange={selectFile} id='fileinput' multiple type="file" />
                  <Button variant="contained" component="span" className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
                    'messages-grid__option--active'
                    }`} sx={{ mx: 1, my: 2 }}>
                    Seleccionar archivo
                  </Button>
                </label>
                <Button onClick={sendFile} variant="contained" className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                  }`} sx={{ mx: 1, my: 2 }}>
                  Actualizar
                </Button>
                {paciente.antecedentes !== '' &&
                  <Button onClick={getPdf} variant="contained" className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
                    'messages-grid__option--active'
                    }`} sx={{ mx: 1, my: 2 }}>
                    Descargar
                  </Button>
                }
                <Snackbar
                  open={visible2}
                  autoHideDuration={6000}
                  onClose={handleClose2}
                  message={pdfResponse}
                  action={action}
                />
              </div>
            </form>
          </Paper>
        </Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button variant='contained' onClick={getInfoPacienteSubmit(onSubmit)} className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
            'messages-grid__option--active'
            }`} >Actualizar Información</Button>
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
            <Button disabled={message === ''} variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

      </>
    )
  }
}
