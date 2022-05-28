import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm, Controller } from 'react-hook-form'
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
import { AccessControlLevel, useExternalApi } from '../hooks/InfoPacienteResponse'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'

export default function InfoPaciente (props) {
  const { control, handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const { handleSubmit: getPwPopUp, register: registro1 } = useForm()
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    apiResponse,

    getInfoPaciente,
    updatePaciente,
    updatePw
  } = useExternalApi()

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paciente, setPaciente] = useState({})
  const [fecha, setFecha] = useState(null)
  const [responsePw, setResponsePw] = useState('')
  const [isLoading1, setIsLoading1] = useState(false)

  const ciudades = [
    { value: 'Santiago de Cali', label: 'Santiago de Cali' },
    { value: 'Bogotá', label: 'Bogotá' },
    { value: 'Medellín', label: 'Medellín' }
  ]

  useEffect(() => {
    getInfoPaciente('1', setPaciente, setFecha)
  }, [])

  const onSubmit = data => {
    setIsLoading(true)
    updatePaciente(data, '1')
    handleClickOpen2()
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const onSubmit2 = data => {
    setIsLoading1(true)
    updatePw(data, '1', 'Paciente', setResponsePw)
    setTimeout(() => {
      setIsLoading1(false)
    }, 2000)
  }

  const handleClickOpen = () => { setVisible(true) }
  const handleClickOpen2 = () => { setVisible2(true) }
  const handleClose = () => { setVisible(false) }
  const handleClose2 = () => { setVisible2(false) }

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
        <AccountCircleIcon sx = {{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
          Mi información personal
        </Typography>

        <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          <Paper elevation = {8} sx = {{ padding: 6 }}>
            <form onSubmit = {getInfoPacienteSubmit(onSubmit)}>
              <div>
                <TextField
                  select
                  label="Identificación"
                  defaultValue = {paciente.tipo_id}
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
                  defaultValue = {paciente.identificacion}
                  {...registro('identificacion', { required: true })}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Nombre"
                  defaultValue = {paciente.nombre}
                  {...registro('nombre', { required: true })}
                  sx={{ mx: 1, my: 2, width: '20ch' }}
                />
                <TextField
                  label="Apellido"
                  defaultValue = {paciente.apellido}
                  {...registro('apellido', { required: true })}
                  sx={{ mx: 1, my: 2, width: '30ch' }}
                />
              </div>
              <div>
                <Grid container >
                  <TextField
                    id="textfield-direccion"
                    label="Dirección"
                    defaultValue = {paciente.direccion}
                    {...registro('direccion', { required: true })}
                    sx={{ mx: 1, my: 2, width: '30ch' }}
                  />
                  <Controller
                    name="ciudad"
                    control={control}
                    defaultValue = {paciente.ciudad}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id = 'ciudad'
                        options = {ciudades}
                        getOptionLabel = {(ciudad) => ciudad.label}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        renderInput = {(params) => (
                          <TextField
                            required
                            {...params}
                            label = "Ciudad"
                            sx={{ mx: 1, my: 2, width: '25ch' }}
                          />
                        )}
                        onChange = {(_, data) => {
                          if (data === null) {
                            onChange(paciente.ciudad)
                            return paciente.ciudad
                          } else {
                            onChange(data.value)
                            return data.value
                          }
                        }}
                        defaultValue = {{ value: paciente.ciudad, label: paciente.ciudad }}
                      />
                    )}
                  />
                  <TextField
                    sx={{ mx: 1, my: 2, width: '25ch' }}
                    label="Teléfono"
                    type = "number"
                    defaultValue={paciente.telefono}
                    {...registro('telefono', { required: true })}
                  />
                </Grid>
              </div>
              <div>
                <Grid container >
                  <Controller
                      defaultValue = {new Date(fecha).toISOString()}
                      render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label='nacimiento'
                              onChange={(date) => {
                                field.onChange(date.toISOString())
                                setFecha(date.toISOString())
                              }}
                              value={fecha}
                              renderInput={(params) => <TextField sx={{ mx: 1, my: 2, width: '25ch' }} {...params} />}
                            />
                          </LocalizationProvider>
                      )}
                      name="nacimiento"
                      control={control}
                  />
                  <TextField
                    label="Edad"
                    defaultValue= {paciente.edad}
                    type = "number"
                    {...registro('edad', { required: true })}
                    sx={{ mx: 1, my: 2, width: '10ch' }}
                  />
                  <TextField
                    label="Correo Electrónico"
                    type = "email"
                    defaultValue={paciente.correo}
                    {...registro('correo', { required: true })}
                    sx={{ mx: 1, my: 2, width: '40ch' }}
                  />
                  <a href='http://www.africau.edu/images/default/sample.pdf' download='prueba.pdf'>
                    <Button variant = 'contained' sx={{ mx: 1, my: 2, width: '20ch' }}>
                      Antecedentes
                    </Button>
                  </a>
                </Grid>
              </div>
            </form>
          </Paper>
        </Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button variant = 'contained' onClick={handleClickOpen} >Cambiar contraseña</Button>
          <Button variant = 'contained' onClick={ getInfoPacienteSubmit(onSubmit) } className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` } >Actualizar Información</Button>
        </Box>

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
                  Nueva contraseña
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
                <DialogContentText>
                  {isLoading1 && <CircularProgress />}
                  {!isLoading1 && responsePw}
                </DialogContentText>
                </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={getPwPopUp(onSubmit2)} className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }`}>Cambiar</Button>
            </DialogActions>
          </Dialog>

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
