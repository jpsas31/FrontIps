import * as React from 'react'
import Box from '@mui/material/Box'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'

export default function TableMedicos (props) {
  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const cargos = [{ value: 1, label: 'Admin' }, { value: 2, label: 'Médico' }]
  const especialidades = [{ value: 1, label: 'General' }, { value: 2, label: 'Psicologia' }, { value: 3, label: 'Pediatria' }, { value: 4, label: 'Cardiologia' }, { value: 5, label: 'Dermatologia' }, { value: 6, label: 'Oftalmologia' }]

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
      name: 'Cargo',
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
                  sx={{ width: '15ch' }}
                >
                  {cargos.map((option) => (
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
      name: 'Especialidad',
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
              sx={{ width: '20ch' }}
            >
              {especialidades.map((option) => (
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
      name: 'Nombre',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
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
      name: 'Teléfono',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
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
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true
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
      name: 'Salario',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              type = "number"
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
      name: 'Certificado',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<Button onClick={() => props.obtenerCert(tableMeta.rowData)} variant="contained" className={`messages-grid__option ${
              props.selectedAccessControlLevelMedico === props.AccessControlLevelMedico.PROTECTED &&
              'messages-grid__option--active'}`}>
              Descargar
            </Button>
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
          <IconButton onClick={() => props.actualizarMedico(tableMeta.rowData)} className={`messages-grid__option ${
            props.selectedAccessControlLevelMedico === props.AccessControlLevelMedico.PROTECTED &&
            'messages-grid__option--active'
          }` }>
            <BorderColorIcon />
          </IconButton>
        )
      }
    }
  ]

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
            title={'Medicos'}
            data={props.info}
            columns={columns}
            options={options}
          />
      </Box>
  )
}
