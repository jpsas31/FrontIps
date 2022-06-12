import * as React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoAdminResponse'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export default function InfoAdmin (props) {
  const {
    selectedAccessControlLevel,
    // apiEndpoint,
    // apiResponse,
    getPacientes,
    getMedicos,
    getAdmins
  } = useExternalApi()

  const [info, setInfo] = useState([])
  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [
    { value: 'Cali', label: 'Cali' },
    { value: 'Bogota', label: 'Bogota' },
    { value: 'Medellin', label: 'Medellin' }
  ]
  const getInfoPacientes = () => {
    setInfo([0, 'waiting'])
    getPacientes(setInfo)
  }

  const getInfoMedicos = () => {
    setInfo([0, 'waiting'])
    getMedicos(setInfo)
  }

  const getInfoAdmins = () => {
    setInfo([0, 'waiting'])
    getAdmins(setInfo)
  }

  const columns = [
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
              sx={{ width: '10ch' }}>
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
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              sx={{ width: '25ch' }}
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
          <IconButton onClick={() => console.log(tableMeta.rowData)}>
            <BorderColorIcon />
          </IconButton>
        )
      }
    }]

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none'
  }

  return (
        <>
          {(info[1] === 'waiting') && <LinearProgress />}
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
          {(info[1] !== 'waiting' && info.length !== 0) &&
            <Box sx = {{ mt: 10 }}>
              <MUIDataTable
                title={'Pacientes'}
                data={info[1]}
                columns={columns}
                options={options}
              />
            </Box>
          }
        </>
  )
}
