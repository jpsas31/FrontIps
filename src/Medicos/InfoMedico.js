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
import { styled } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function InfoMedico (props) {
  const { handleSubmit: getInfoMedicoSubmit, register: registro } = useForm()
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    // apiResponseMedico,

    getInfoMedico,
    updateMedico,
    uploadFile,
    getFile
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [medico, setMedico] = useState({})
  const [message, setMessage] = useState('')
  const { user } = useAuth0()
  const [file, setFile] = useState(null)
  const [pdfResponse, setPdfResponse] = useState('')
  const [visible2, setVisible2] = useState(false)

  useEffect(() => {
    getInfoMedico(user.sub, setMedico)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updateMedico(data, user.sub, setMessage)
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
  const especialidades = [{ value: 1, label: 'General' }, { value: 2, label: 'Psicologia' }, { value: 3, label: 'Pediatria' }, { value: 4, label: 'Cardiologia' }, { value: 5, label: 'Dermatologia' }, { value: 6, label: 'Oftalmologia' }]

  const handleClickOpen2 = () => { setVisible2(true) }
  const handleClose2 = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    setVisible2(false)
    setMessage('')
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
        <AccountCircleIcon sx={{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }} />

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
          Mi información personal
        </Typography>

        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          <Paper elevation={8} sx={{ padding: 6 }}>
            <form onSubmit={getInfoMedicoSubmit(onSubmit)}>
              <div>
                <TextField
                  select
                  label="Identificación"
                  defaultValue={medico.tipo_id}
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
                  defaultValue={medico.identificacion}
                  {...registro('identificacion', { required: true })}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Nombre"
                  defaultValue={medico.nombre}
                  inputProps={{
                    maxLength: 25
                  }}
                  {...registro('nombre', { required: true })}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Apellido"
                  defaultValue={medico.apellido}
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
                    select
                    label="Cargo"
                    defaultValue={medico.tipo_id_cargo}
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
                    defaultValue={medico.direccion}
                    inputProps={{
                      maxLength: 30
                    }}
                    {...registro('direccion', { required: true })}
                    sx={{ mx: 1, my: 2, width: '30ch' }}
                  />
                  <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Teléfono"
                    type="number"
                    inputProps={{
                      maxLength: 15
                    }}
                    defaultValue={medico.telefono}
                    {...registro('telefono', { required: true })}
                  />
                  <TextField
                    label="Correo Electrónico"
                    type="email"
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
                  defaultValue={medico.medicos.id_especialidad}
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
                  type="number"
                  defaultValue={medico.salario}
                  InputProps={{
                    readOnly: true
                  }}
                  {...registro('salario', { required: true })}
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
                  Certificado
                </Typography>
                <label htmlFor='fileinput'>
                  <Input onChange={selectFile} id='fileinput' multiple type="file" />
                  <Button variant="contained" component="span" className={`messages-grid__option ${selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                    'messages-grid__option--active'
                    }`} sx={{ mx: 1, my: 2 }}>
                    Seleccionar archivo
                  </Button>
                </label>
                <Button onClick={sendFile} variant="contained" className={`messages-grid__option ${selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                  }`} sx={{ mx: 1, my: 2 }}>
                  Actualizar
                </Button>
                {medico.medicos.certificacion_del_titulo !== '' &&
                  <Button onClick={getPdf} variant="contained" className={`messages-grid__option ${selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
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
          <Button variant='contained' onClick={getInfoMedicoSubmit(onSubmit)} className={`messages-grid__option ${selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
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
