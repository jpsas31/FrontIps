import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoAdminResponse'
import { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import FormControlLabel from '@mui/material/FormControlLabel'
import Container from '@mui/material/Container'
// import CircularProgress from '@mui/material/CircularProgress'

export default function Cumpleanos () {
  const {
    selectedAccessControlLevelAdmin,
    // apiEndpoint,
    // apiResponseAdmin,
    getCumple
  } = useExternalApi()

  const { handleSubmit, register: registro } = useForm()
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState({})

  const onSubmit = data => {
    setInfo({})
    setVisible(false)
    getCumple(data, setInfo)
  }

  useEffect(() => {
    if (JSON.stringify(info) !== '{}' && info.length > 0) {
      setVisible(true)
    }
  }, [info])

  const columns = [
    {
      name: 'key',
      options: {
        display: false,
        filter: false
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
                disableUnderline: true,
                maxLength: 30,
                readOnly: true
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
                disableUnderline: true,
                maxLength: 25,
                readOnly: true
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
                disableUnderline: true,
                maxLength: 15,
                readOnly: true
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
                disableUnderline: true,
                readOnly: true
              }}
              type = "date"
              sx={{ width: '20ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    }]

  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    viewColumns: false,
    print: true
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <TextField
                  sx={{ mx: 1, my: 1, width: '20ch' }}
                  type = "date"
                  label = "Fecha Inicial"
                  required
                  InputLabelProps={{ shrink: true }}
                  {...registro('fechaInicial', { required: true })}
                />
              <TextField
                sx={{ mx: 1, my: 1, width: '20ch' }}
                type = "date"
                label = "Fecha Final"
                required
                InputLabelProps={{ shrink: true }}
                {...registro('fechaFinal', { required: true })}
              />
            <Button onClick = { handleSubmit(onSubmit) } variant="contained" sx={{ mx: 1, my: 1 }}
              className={`messages-grid__option ${
                selectedAccessControlLevelAdmin === AccessControlLevel.PROTECTED &&
                'messages-grid__option--active'
              }`}>
                Consultar
            </Button>
        </form>
      </div>
      <div>
          {visible &&
          <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mt: 3, mb: 2 }} >
            <MUIDataTable
              title={'Cumpleaños'}
              data={info}
              columns={columns}
              options={options}
            />
          </Container>}
      </div>
    </>
  )
}
