import * as React from 'react'
import Box from '@mui/material/Box'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export default function TablePacientes (props) {
  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [
    { value: 'Cali', label: 'Cali' },
    { value: 'Bogota', label: 'Bogota' },
    { value: 'Medellin', label: 'Medellin' }
  ]

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
          <IconButton onClick={() => props.actualizarPaciente(tableMeta.rowData)} className={`messages-grid__option ${
            props.selectedAccessControlLevelPaciente === props.AccessControlLevelPaciente.PROTECTED &&
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
      <Box sx = {{ mt: 8, ml: 1, mr: 1 }}>
          <MUIDataTable
            title={'Pacientes'}
            data={props.info}
            columns={columns}
            options={options}
          />
      </Box>
  )
}
