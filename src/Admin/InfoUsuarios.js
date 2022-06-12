import * as React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoAdminResponse'
import { AccessControlLevel as AccessControlLevelPaciente, useExternalApi as useExternalApiPaciente } from '../hooks/InfoPacienteResponse'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'

export default function InfoAdmin (props) {
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    // apiResponse,
    getPacientes,
    getMedicos,
    getAdmins
  } = useExternalApi()

  const {
    selectedAccessControlLevelPaciente,
    // apiEndpoint,
    apiResponsePaciente,

    updatePaciente
  } = useExternalApiPaciente()

  const [info, setInfo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [selPaciente, setSelPaciente] = useState(false)
  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [
    { value: 'Cali', label: 'Cali' },
    { value: 'Bogota', label: 'Bogota' },
    { value: 'Medellin', label: 'Medellin' }
  ]
  const getInfoPacientes = () => {
    setIsUpdated(true)
    setSelPaciente(true)
    setInfo('waiting')
  }

  const getInfoMedicos = () => {
    setInfo('waiting')
    getMedicos(setInfo)
  }

  const getInfoAdmins = () => {
    setInfo('waiting')
    getAdmins(setInfo)
  }

  useEffect(() => {
    if (isUpdated) {
      getPacientes(setInfo)
    }
  }, [isUpdated])

  const handleClickOpen = () => { setVisible(true) }
  const handleClose = () => { setVisible(false) }

  const actualizarPaciente = (data) => {
    const transformJson = JSON.parse(JSON.stringify(
      {
        tipo_id: data[1],
        identificacion: data[2],
        nombre: data[3],
        apellido: data[4],
        direccion: data[5],
        ciudad: data[6],
        telefono: data[7],
        correo: data[8],
        edad: data[9],
        nacimiento: new Date(data[10]),
        antecedentes: data[11]
      }
    ))

    const key = data[0]

    setIsLoading(true)
    setIsUpdated(false)
    setSelPaciente(false)
    updatePaciente(transformJson, key)
    handleClickOpen()
    setTimeout(() => {
      setIsUpdated(true)
      setSelPaciente(true)
      setIsLoading(false)
    }, 2000)
  }

  const columns = [
    {
      name: 'key',
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: 'Tipo',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              select
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              label=""
              sx={{ width: '8ch' }}>
              {tipoids.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
            </TextField>
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Identificación',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              type = "number"
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '18ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Nombre',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '20ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Apellido',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '30ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Direccion',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '30ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Ciudad',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={
                <TextField
                select
                label=""
                variant="standard"
                InputProps={{
                  disableUnderline: true
                }}
                sx={{ width: '15ch' }}>
                {ciudades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
              </TextField>
              }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Teléfono',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              type = "number"
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '15ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Correo',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '40ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Edad',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              type = "number"
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '7ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Nacimiento',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              type = "date"
              sx={{ width: '20ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Antecedentes',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '20ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: '',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <IconButton onClick={() => actualizarPaciente(tableMeta.rowData)} className={`messages-grid__option ${
            selectedAccessControlLevelPaciente === AccessControlLevelPaciente.PROTECTED &&
            'messages-grid__option--active'
          }` }>
            <BorderColorIcon />
          </IconButton>
        )
      }
    }]

  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    viewColumns: false,
    print: false
  }

  return (
        <>
          {(info === 'waiting') && <LinearProgress />}
          <AccountCircleIcon sx = {{ mt: 5, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 80 }}/>
          <Typography component="h1" variant="h6" sx={{ textAlign: 'center', pt: 2, fontSize: '2em', pb: 2 }}>
            Información de los usuarios
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Button variant = 'contained' onClick={getInfoPacientes} className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Pacientes
            </Button>
            <Button variant = 'contained' onClick={getInfoMedicos} className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Médicos
            </Button>
            <Button variant = 'contained' onClick={getInfoAdmins} className={`messages-grid__option ${
                  selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Administradores
            </Button>
          </Box>
          {(info !== 'waiting' && info !== '' && isUpdated && selPaciente) &&
            <Box sx = {{ mt: 8, ml: 1, mr: 1 }}>
              <MUIDataTable
                title={'Pacientes'}
                data={info}
                columns={columns}
                options={options}
              />
            </Box>
          }

          <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
            <DialogTitle>Alerta</DialogTitle>
            <DialogContent>
              <DialogContentText>
              {isLoading && <CircularProgress />}
              {!isLoading && apiResponsePaciente}
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
